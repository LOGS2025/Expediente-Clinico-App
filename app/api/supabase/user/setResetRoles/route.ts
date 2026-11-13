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
     const [telemedicoRes, supervisorRes, pacienteRes] = await Promise.all([
      supabase
        .from('telemedicos')
        .delete()
        .eq('fk_telemedic_user_id', body.uuid)
        .select(),

      supabase
        .from('supervisores')
        .delete()
        .eq('fk_supervisor_user_id', body.uuid)
        .select(),

      supabase
        .from('pacientes')
        .delete()
        .eq('fk_patient_user_id', body.uuid)
        .select(),
    ]);
    
    return Response.json({ 
      success: true, 
      data: {telemedicoRes,supervisorRes,pacienteRes} 
    })
    
  } catch(error) {
    return Response.json({ 
      success: false, 
      error: (error as any).message 
    }, { status: 500 })
  }
}