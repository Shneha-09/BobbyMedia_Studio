import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Photo from '@/models/Photo';

export async function POST(req, context) {
  await connectDB();

  const { id } = await context.params;

  const photo = await Photo.findById(id);

  if (!photo) {
    return NextResponse.json(
      { success: false, message: 'Photo not found' },
      { status: 404 }
    );
  }

  photo.likes = (photo.likes || 0) + 1;
  await photo.save();

  return NextResponse.json({
    success: true,
    likes: photo.likes,
  });
}