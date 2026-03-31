import { format } from "date-fns";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });
  
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-muted/30 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12">
          <h1 className="font-serif text-4xl font-semibold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your incoming bookings and leads.</p>
        </div>

        {/* BOOKINGS TABLE */}
        <div className="bg-card rounded-2xl shadow-sm border border-muted overflow-hidden mb-12">
          <div className="p-6 border-b border-muted bg-muted/10 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Confirmed Bookings</h2>
            <span className="bg-brand text-brand-foreground text-xs font-bold px-3 py-1 rounded-full">
              {bookings.length} Total
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-muted/20 text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-medium">Date & Time</th>
                  <th className="px-6 py-4 font-medium">Client</th>
                  <th className="px-6 py-4 font-medium">Phone</th>
                  <th className="px-6 py-4 font-medium">Service</th>
                  <th className="px-6 py-4 font-medium">Event Date</th>
                  <th className="px-6 py-4 font-medium">Event Value</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/50">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking: any) => {
                    let servicesParsed = [];
                    try {
                      servicesParsed = JSON.parse(booking.services);
                    } catch (e) {
                      servicesParsed = [booking.services];
                    }
                    
                    return (
                      <tr key={booking.id} className="hover:bg-muted/10 transition-colors">
                        <td className="px-6 py-4 font-medium">{format(booking.createdAt, "MMM d, yyyy HH:mm")}</td>
                        <td className="px-6 py-4">{booking.clientName}</td>
                        <td className="px-6 py-4">
                          <a href={`https://wa.me/${booking.clientPhone.replace(/\D/g,'')}`} className="text-brand hover:underline" target="_blank" rel="noreferrer">
                            {booking.clientPhone}
                          </a>
                        </td>
                        <td className="px-6 py-4">{servicesParsed.join(', ')}</td>
                        <td className="px-6 py-4 font-medium">{format(booking.eventDate, "MMM d, yyyy")}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span>Total: ${booking.totalPrice}</span>
                            <span className="text-xs text-green-600 font-semibold">Adv: ${booking.advancePaid}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* LEADS TABLE */}
        <div className="bg-card rounded-2xl shadow-sm border border-muted overflow-hidden">
          <div className="p-6 border-b border-muted bg-muted/10 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Lead Pipeline</h2>
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {leads.length} Leads
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-muted/20 text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-medium">Captured On</th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Source</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/50">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      No leads captured yet.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead: any) => (
                    <tr key={lead.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 font-medium">{format(lead.createdAt, "MMM d, yyyy HH:mm")}</td>
                      <td className="px-6 py-4 font-medium">{lead.name}</td>
                      <td className="px-6 py-4">{lead.email}</td>
                      <td className="px-6 py-4">
                        <span className="bg-muted text-muted-foreground text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {lead.service}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {lead.status === "NEW" ? (
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            NEW
                          </span>
                        ) : (
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            CONTACTED
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
