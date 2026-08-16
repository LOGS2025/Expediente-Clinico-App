import { AppointmentSlice } from "@/lib/models/Appointment";
import { supabase } from "@/lib/supabase/client"
import { NextRequest } from "next/server";

export async function POST(request : NextRequest) {
  try {
    const body : AppointmentSlice = await request.json();
    
    // Insert into Supabase
    const { data, error } = await supabase
      .from("citas")
      .insert({
        fecha : body.date,
        motif : body.motif,
        pendiente : true /*body.pending*/,
        fk_doctor : body.doctor_uuid,
        fk_paciente : body.pacient_uuid,
        fk_supervisor : body.supervisor_uuid
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