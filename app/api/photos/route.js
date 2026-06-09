import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import cloudinary from '@/lib/cloudinary';
import Photo from '@/models/Photo';
export async function GET() {
  await connectDB();
  const photos = await Photo.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, photos });
}

export async function POST(req) {
  await connectDB();

  const formData = await req.formData();
  const category = formData.get('category');
  const file = formData.get('file');

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploaded = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: 'bobby_media_studio/photos' }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
      .end(buffer);
  });

  const photo = await Photo.create({
    category,
    imageUrl: uploaded.secure_url,
    publicId: uploaded.public_id,
  });

  return NextResponse.json({ success: true, photo });
}

export async function DELETE(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const photo = await Photo.findById(id);

  if (!photo) {
    return NextResponse.json({ success: false });
  }

  await cloudinary.uploader.destroy(photo.publicId);
  await Photo.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}