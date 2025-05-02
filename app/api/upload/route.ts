// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db('fixturesDB');
    const collection = db.collection('fixtures');

    const result = await collection.insertMany(data);
    return NextResponse.json({ message: 'insert data success', insertedCount: result.insertedCount });
  } catch (error) {
    console.error('Data insertion failed:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
