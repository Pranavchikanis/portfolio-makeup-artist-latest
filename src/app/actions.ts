"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function processDemoPayment(amount: number) {
  // Simulate a payment API call that takes 1.5s
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Return a mock success response 
  return { success: true, transactionId: `demo_txn_${Math.random().toString(36).substr(2, 9)}` };
}

export async function createBooking(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const dateStr = formData.get("date") as string;
  const service = formData.get("service") as string;
  
  if (!name || !phone || !dateStr || !service) {
    return { error: "Missing required fields" };
  }
  
  const eventDate = new Date(dateStr);
  
  // Check availability
  const existingBooking = await prisma.booking.findFirst({
    where: {
      eventDate: {
        gte: new Date(eventDate.setHours(0, 0, 0, 0)),
        lte: new Date(eventDate.setHours(23, 59, 59, 999))
      }
    }
  });
  
  if (existingBooking) {
    return { error: "This date is already booked. Please select another date." };
  }
  
  // Simulate doing a demo payment of 20% advance or fixed 50$ fee
  // We'll use fixed $50 for simplicity in the demo
  const paymentResponse = await processDemoPayment(50);
  
  if (!paymentResponse.success) {
    return { error: "Payment failed. Please try again." };
  }
  
  // Create booking
  await prisma.booking.create({
    data: {
      clientName: name,
      clientPhone: phone,
      eventDate: new Date(dateStr),
      services: JSON.stringify([service]),
      totalPrice: 500, // Usually calculated based on service, mocked here
      advancePaid: 50,
      status: "CONFIRMED"
    }
  });
  
  revalidatePath("/admin");
  redirect(`/success?txn=${paymentResponse.transactionId}`);
}

export async function captureLead(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  
  if (!name || !email) {
    return { error: "Missing name or email" };
  }
  
  try {
    await prisma.lead.create({
      data: {
        name,
        email,
        phone: "N/A", // Not collected in popup but required by schema
        eventDate: new Date(), // Just a placeholder date
        service: "General Inquiry",
        status: "NEW"
      }
    });
    
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to capture lead:", error);
    return { error: "Failed to save lead" };
  }
}
