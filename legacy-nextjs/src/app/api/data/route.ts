import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');

    let staysQuery = supabase.from('stays').select('*').order('created_at', { ascending: true });
    let foodQuery = supabase.from('food').select('*').order('created_at', { ascending: true });
    let activitiesQuery = supabase.from('activities').select('*').order('created_at', { ascending: true });

    if (state) {
      staysQuery = staysQuery.eq('state', state);
      foodQuery = foodQuery.eq('state', state);
      activitiesQuery = activitiesQuery.eq('state', state);
    }

    const [staysRes, foodRes, activitiesRes] = await Promise.all([
      staysQuery,
      foodQuery,
      activitiesQuery
    ]);

    if (staysRes.error || foodRes.error || activitiesRes.error) {
      throw staysRes.error || foodRes.error || activitiesRes.error;
    }

    return NextResponse.json({ 
      stays: staysRes.data, 
      food: foodRes.data, 
      activities: activitiesRes.data 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
