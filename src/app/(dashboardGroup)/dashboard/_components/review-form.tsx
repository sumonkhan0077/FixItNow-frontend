"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CustomerBooking } from "@/lib/types";
import { createReview } from "@/service/customer/reviewActions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarPicker } from "./star-picker";
import { Send } from "lucide-react";

interface ReviewFormProps {
  booking: CustomerBooking;
  onSubmitted: () => void;
}

export function ReviewForm({ booking, onSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [pending, setPending] = useState(false);
  const techProfileId = booking.service.technicianProfile?.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }
    if (!techProfileId) {
      toast.error("Technician info missing.");
      return;
    }
    setPending(true);
    try {
      const result = await createReview({
        bookingId: booking.id,
        technicianProfileId: techProfileId,
        rating,
        comment: comment.trim() || undefined,
      });
      if (result.success) {
        toast.success("Review submitted!");
        onSubmitted();
      } else {
        toast.error(result.message || "Failed to submit.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <StarPicker value={rating} onChange={setRating} />
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience (optional)..."
        className="min-h-[80px] resize-none bg-background/50 text-sm"
      />
      <Button type="submit" disabled={pending} size="sm" className="w-full gap-2 font-semibold">
        {pending ? (
          <>
            <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="size-3.5" />
            Submit Review
          </>
        )}
      </Button>
    </form>
  );
}