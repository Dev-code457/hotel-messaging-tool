import { v4 as uuidv4 } from 'uuid';

export function generateDbName(hotelName: string): string {
  const sanitizedHotelName = hotelName.replace(/\s+/g, '_').toLowerCase();
  const uniqueSuffix = uuidv4().slice(0, 3);
  return `${sanitizedHotelName}_${uniqueSuffix}`;
}
