// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const team = searchParams.get('team');

  if (!team) {
    return NextResponse.json({ message: 'Missing query parameters' }, { status: 400 });
  }
  try {
    const client = await clientPromise;
    const db = client.db('fixturesDB');
    const collection = db.collection('fixtures');
    
    const fixtures = await collection
      .find({
        $or: [
          { home_team: { $regex: team, $options: 'i' } },
          { away_team: { $regex: team, $options: 'i' } },
        ],
      })
      .toArray();
    console.log('fixtures', fixtures)
    return NextResponse.json(fixtures);
  } catch (error) {
    console.error('Search failed:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
