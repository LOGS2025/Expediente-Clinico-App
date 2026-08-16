import { AppointmentToSupabase } from "@/lib/models/Appointment";
import { supabase } from "@/lib/supabase/client"
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
  try {
    const body : AppointmentToSupabase = await request.json();
    
    if (!body.date || !body.motif || !body.doctor_uuid || !body.patient_uuid) {
      console.error('Missing required fields:', body);
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: date, motif, doctor_uuid, patient_uuid'
      }, { status: 400 });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("citas")
      .insert({
        fecha : body.date,
        motif : body.motif,
        pendiente : true /*body.pending*/,
        fk_doctor : body.doctor_uuid,
        fk_paciente : body.patient_uuid,
        fk_supervisor : body.supervisor_uuid || null
      })
      .select()
    
    if (error) {
      console.error("Supabase error:", error);
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
    console.error("API error:", error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}