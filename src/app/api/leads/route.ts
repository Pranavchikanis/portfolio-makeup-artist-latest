import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email || null,
        phone: body.phone,
        eventDate: new Date(body.eventDate),
        service: body.service,
        location: body.location || null,
        budget: body.budget || null,
        status: "NEW"
      }
    });

    // Mocking an automated WhatsApp trigger or Email response
    console.log("[AUTO-RESPONDER] Firing confirmation alert for lead:", lead.id);

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
