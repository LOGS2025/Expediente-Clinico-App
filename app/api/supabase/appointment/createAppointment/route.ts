import { AppointmentToSupabase } from "@/lib/models/Appointment";
import { supabase } from "@/lib/supabase/client"
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
  try {
    const body : AppointmentToSupabase = await request.json();
    
    if (!body.supervisor_uuid || !body.telemedic_uuid || !body.patient_uuid) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: telemedic_uuid, doctor_uuid, patient_uuid'
      }, { status: 400 });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("consultas")
      .insert({
        callid : body.callid,
        fk_paciente : body.patient_uuid,
        fk_telemedico : body.telemedic_uuid,
        fk_supervisor : body.supervisor_uuid
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