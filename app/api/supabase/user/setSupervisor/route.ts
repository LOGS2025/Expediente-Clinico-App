import { supabase } from "@/lib/supabase/client"
import { NextRequest, NextResponse } from "next/server";

/**
 --INSERT INTO usuarios (nombre, apellido_p, apellido_m, uuid) VALUES
 --  ('Sebastian', 'Lopez', 'Guevara', 'DLnYKiEoyTdMo44HoiFwtHmj0KO2' );
 */

 export async function POST(request : NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.uuid) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("supervisores")
      .insert({
        fk_supervisor_user_id : body.uuid
      })
      .select()
    if (error) {
      return Response.json({ 
        success: false, 
        error: error.message 
      }, { status: 400 })
    }
    
    return Response.json({ 
      success: true, 
      data: data 
    })
    
  } catch(error) {
    return Response.json({ 
      success: false, 
      error: (error as any).message 
    }, { status: 500 })
  }
}