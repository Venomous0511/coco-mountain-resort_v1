import { Suspense } from 'react';
import CottageBookingFormClient from './CottageBookingFormClient';

export default function CottageBookingServerPage() {
  return (
    <Suspense fallback={<div>Loading booking form...</div>}>
      <CottageBookingFormClient />
    </Suspense>
  );
}
