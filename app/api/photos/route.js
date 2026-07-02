import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import cloudinary from '@/lib/cloudinary';
import Photo from '@/models/Photo';

export const dynamic = 'force-dynamic';

// optimize image
function optimize(url) {
  if (!url) return url;
  if (!url.includes('res.cloudinary.com')) return url;

  return url.replace(
    '/image/upload/',
    '/image/upload/f_auto,q_auto,w_800/'
  );
}

/* ---------------- GET (FAST + FILTER FIX) ---------------- */
export async function GET() {
  try {
    await connectDB();

    const photos = await Photo.find({ type: "gallery" })
      .select('category imageUrl publicId likes createdAt')
      .sort({ createdAt: -1 })
      .lean();

    const data = photos.map((p) => ({
      _id: p._id,
      category: p.category,
      imageUrl: optimize(p.imageUrl),
      likes: p.likes || 0,
    }));

    return NextResponse.json({ success: true, photos: data });

  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, error: "fetch failed" },
      { status: 500 }
    );
  }
}

/* ---------------- POST ---------------- */
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const category = formData.get("category");
    const file = formData.get("file");

    if (!category || !file) {
      return NextResponse.json(
        { success: false, error: "missing fields" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploaded = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "photos",
          resource_type: "image",
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      ).end(buffer);
    });

    const photo = await Photo.create({
      category,
      imageUrl: uploaded.secure_url,
      publicId: uploaded.public_id,
      likes: 0,
      type: "gallery",
    });

    return NextResponse.json({ success: true, photo });

  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, error: "upload failed" },
      { status: 500 }
    );
  }
}

/* ---------------- DELETE ---------------- */
export async function DELETE(req) {
  try {
    await connectDB();

    const id = new URL(req.url).searchParams.get("id");

    const photo = await Photo.findById(id);

    if (!photo) {
      return NextResponse.json(
        { success: false, error: "not found" },
        { status: 404 }
      );
    }

    if (photo.publicId) {
      await cloudinary.uploader.destroy(photo.publicId);
    }

    await Photo.findByIdAndDelete(id);

    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json(
      { success: false, error: "delete failed" },
      { status: 500 }
    );
  }
}