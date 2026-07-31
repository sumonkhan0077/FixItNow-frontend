// src/app/admin-dashboard/analytics/page.tsx

import { formatDate } from "@/utils/formatDate";
import { GsapWrapper } from "../../technician-dashboard/_components/gsap-wrapper";
import { BarChart3, DollarSign, TrendingUp, CreditCard, CheckCircle2, Calendar } from "lucide-react";
import Image from "next/image";
import { getPaymentsData } from "@/service/admin/payment";

export default async function AdminAnalyticsPage() {
  const payments = await getPaymentsData();

  
  const totalRevenue = payments.reduce((acc: number, curr: any) => acc + Number(curr.amount || 0), 0);
  const totalTransactions = payments.length;

  
  const now = new Date();
  const currentMonth = now.getUTCMonth();
  const currentYear = now.getUTCFullYear();

  
  const startOfWeek = new Date(now);
  startOfWeek.setUTCDate(now.getUTCDate() - now.getUTCDay());
  startOfWeek.setUTCHours(0, 0, 0, 0);

  let monthlyRevenue = 0;
  let weeklyRevenue = 0;

  payments.forEach((p: any) => {
    const paymentDateStr = p.paidAt || p.createdAt;
    if (!paymentDateStr) return;
    const pDate = new Date(paymentDateStr);
    const amount = Number(p.amount || 0);

  
    if (pDate.getUTCMonth() === currentMonth && pDate.getUTCFullYear() === currentYear) {
      monthlyRevenue += amount;
    }

   
    if (pDate >= startOfWeek) {
      weeklyRevenue += amount;
    }
  });


  const serviceRevenueMap: { [key: string]: { title: string; image: string; totalAmount: number; count: number } } = {};

  payments.forEach((p: any) => {
    const service = p.booking?.service;
    if (service) {
      const serviceId = service.id;
      const amount = Number(p.amount || 0);

      if (!serviceRevenueMap[serviceId]) {
        serviceRevenueMap[serviceId] = {
          title: service.title,
          image: service.image,
          totalAmount: 0,
          count: 0,
        };
      }
      serviceRevenueMap[serviceId].totalAmount += amount;
      serviceRevenueMap[serviceId].count += 1;
    }
  });

  const serviceRevenueList = Object.values(serviceRevenueMap)
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 10);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-rose-500/10">
            <BarChart3 className="size-5 text-rose-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Analytics & Revenue</h1>
            <p className="text-sm text-muted-foreground">Platform insights, earnings, and payment statistics</p>
          </div>
        </div>
      </GsapWrapper>

      {/* Top Overview Cards (Total, Monthly, Weekly & Transactions) */}
      <GsapWrapper animation="fadeUp" delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="p-5 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Revenue</p>
            <h3 className="text-xl font-black text-foreground mt-1">৳ {totalRevenue.toLocaleString()}</h3>
            <p className="text-[11px] text-emerald-500 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="size-3" /> All-time earnings
            </p>
          </div>
          <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <DollarSign className="size-5" />
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="p-5 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">This Month</p>
            <h3 className="text-xl font-black text-foreground mt-1">৳ {monthlyRevenue.toLocaleString()}</h3>
            <p className="text-[11px] text-muted-foreground mt-1">Current month earnings</p>
          </div>
          <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
            <Calendar className="size-5" />
          </div>
        </div>

        {/* Weekly Revenue */}
        <div className="p-5 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">This Week</p>
            <h3 className="text-xl font-black text-foreground mt-1">৳ {weeklyRevenue.toLocaleString()}</h3>
            <p className="text-[11px] text-muted-foreground mt-1">Current week earnings</p>
          </div>
          <div className="size-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
            <TrendingUp className="size-5" />
          </div>
        </div>

        {/* Total Payments Count */}
        <div className="p-5 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Transactions</p>
            <h3 className="text-xl font-black text-foreground mt-1">{totalTransactions}</h3>
            <p className="text-[11px] text-muted-foreground mt-1">Successful checkouts</p>
          </div>
          <div className="size-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
            <CreditCard className="size-5" />
          </div>
        </div>
      </GsapWrapper>

      {/* Service-wise Revenue breakdown */}
      <GsapWrapper animation="fadeUp" delay={0.2} className="space-y-4">
        <h2 className="text-base font-bold text-foreground">Most Revenue by Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceRevenueList.length > 0 ? (
            serviceRevenueList.map((item, index) => (
              <div 
                key={index} 
                className="p-4 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm space-y-3 hover:border-rose-500/30 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  {item.image ? (
                    <div className="relative size-12 rounded-xl overflow-hidden border border-border/50 shrink-0 bg-muted">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="size-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                      <BarChart3 className="size-5" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-foreground truncate">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.count} Bookings completed</p>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Total Earned:</span>
                  <span className="font-extrabold text-rose-600 dark:text-rose-400 text-sm">
                    ৳ {item.totalAmount.toLocaleString()} BDT
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-8 text-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground">
              No service revenue data available.
            </div>
          )}
        </div>
      </GsapWrapper>

      {/* Recent Payment History Table */}
      <GsapWrapper animation="fadeUp" delay={0.3} className="space-y-4">
        <h2 className="text-base font-bold text-foreground">Recent Payment History</h2>
        <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border/60 bg-muted/40 text-muted-foreground font-semibold uppercase text-[10px] tracking-wider">
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Service</th>
                  <th className="p-3.5">Transaction ID</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {payments.length > 0 ? (
                  payments.slice(0, 10).map((payment: any) => (
                    <tr key={payment.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3.5 font-medium text-foreground">
                        {payment.customer?.name || "N/A"}
                        <span className="block text-[10px] text-muted-foreground">{payment.customer?.email}</span>
                      </td>
                      <td className="p-3.5 font-semibold text-foreground">
                        {payment.booking?.service?.title || "N/A"}
                      </td>
                      <td className="p-3.5 font-mono text-muted-foreground">
                        {payment.transactionId}
                      </td>
                      <td className="p-3.5 font-extrabold text-emerald-600 dark:text-emerald-400">
                        ৳{payment.amount} BDT
                      </td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="size-3" /> {payment.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        {formatDate(payment.paidAt || payment.createdAt)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-muted-foreground italic">
                      No payments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </GsapWrapper>
    </div>
  );
}