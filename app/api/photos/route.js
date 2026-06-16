import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import cloudinary from '@/lib/cloudinary';
import Photo from '@/models/Photo';

export const dynamic = 'force-dynamic';

function optimizeCloudinaryUrl(url) {
  if (!url || !url.includes('res.cloudinary.com')) return url;

  if (url.includes('/f_auto,q_auto,w_600/')) return url;

  return url.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_600/');
}

export async function GET() {
  try {
    await connectDB();

    const photos = await Photo.find()
      .select('category imageUrl publicId likes createdAt')
      .sort({ createdAt: -1 })
      .lean();

    const optimizedPhotos = photos.map((photo) => ({
      ...photo,
      imageUrl: optimizeCloudinaryUrl(photo.imageUrl),
    }));

    return NextResponse.json(
      { success: true, photos: optimizedPhotos },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error('PHOTO_FETCH_ERROR:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const category = formData.get('category');
    const file = formData.get('file');

    if (!category || !file) {
      return NextResponse.json(
        { success: false, error: 'Category and file required' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploaded = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'bobby_media_studio/photos',
            resource_type: 'image',
            transformation: [
              {
                width: 1200,
                crop: 'limit',
                quality: 'auto',
                fetch_format: 'auto',
              },
            ],
            timeout: 120000,
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const optimizedUrl = optimizeCloudinaryUrl(uploaded.secure_url);

    const photo = await Photo.create({
      category,
      imageUrl: optimizedUrl,
      publicId: uploaded.public_id,
      likes: 0,
    });

    return NextResponse.json({
      success: true,
      photo: photo.toObject(),
    });
  } catch (error) {
    console.error('PHOTO_UPLOAD_ERROR:', error);

    return NextResponse.json(
      { success: false, error: error.message || 'Photo upload failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Photo id required' },
        { status: 400 }
      );
    }

    const photo = await Photo.findById(id);

    if (!photo) {
      return NextResponse.json(
        { success: false, error: 'Photo not found' },
        { status: 404 }
      );
    }

    if (photo.publicId) {
      await cloudinary.uploader.destroy(photo.publicId);
    }

    await Photo.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PHOTO_DELETE_ERROR:', error);

    return NextResponse.json(
      { success: false, error: 'Photo delete failed' },
      { status: 500 }
    );
  }
}