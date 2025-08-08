import { Suspense } from 'react';
import RoomBookingFormClient from './RoomBookingFormClient';

export default function RoomBookingFormPage() {
  return (
    <Suspense fallback={<div>Loading booking form...</div>}>
      <RoomBookingFormClient />
    </Suspense>
  );
}
