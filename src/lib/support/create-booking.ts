import { getSession } from './store-instance';
import { audit } from '@/lib/audit';
import type { BookingResult } from '@/types/support';

let bookingCounter = 0;

export function createBooking(sessionId: string, type?: string): BookingResult | null {
  const session = getSession(sessionId);
  if (!session) return null;

  const booking: BookingResult = {
    id: `BKG-${++bookingCounter}`,
    sessionId,
    type: type || 'consultation',
    status: 'stub',
    createdAt: Date.now(),
  };

  audit({ action: 'support_booking_created', user: session.userEmail });
  return booking;
}
