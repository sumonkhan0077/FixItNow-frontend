import PaymentContent from "./_components/PaymentContent";
import  { Suspense } from "react";

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[80vh] items-center justify-center">Loading payment status...</div>}>
      <PaymentContent/>
    </Suspense>
  );
}