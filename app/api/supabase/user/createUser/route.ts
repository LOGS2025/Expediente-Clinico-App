import { supabase } from "@/lib/supabase/client"
import { NextRequest, NextResponse } from "next/server";

/**
 --INSERT INTO usuarios (nombre, apellido_p, apellido_m, uuid) VALUES
 --  ('Sebastian', 'Lopez', 'Guevara', 'DLnYKiEoyTdMo44HoiFwtHmj0KO2' );
 */

 export async function POST(request : NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.nombre || !body.apellido_p || !body.apellido_m || !body.uuid ) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("usuarios")
      .insert({
        nombre : body.nombre,
        apellido_p : body.apellido_p,
        apellido_m : body.apellido_m,
        uuid : body.uuid
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
      error: error.message 
    }, { status: 500 })
  }
}