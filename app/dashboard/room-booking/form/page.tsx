import { Suspense } from 'react';
import RoomBookingFormClient from './RoomBookingFormClient';

export default function RoomBookingServerPage() {
  return (
    <Suspense fallback={<div>Loading booking form...</div>}>
      <RoomBookingFormClient />
    </Suspense>
  );
}
