export interface EventSeed {
   id?: string;
   name: string;
   availableSeats?: number;
   description?: string;
   date?: Date;
   location?: string;
   organizer?: string;
   price: number;
}
