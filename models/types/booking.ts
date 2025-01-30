import { MealOptions } from "../resource/meals";

export interface Guests {
  kids: number;
  teens: number;
  adults: number;
}

export interface MealPlan {
  date: Date;
  meal: string;
}

export interface BookingGroup {
  id: string;
  name: string;
  guests: Guests;
  checkIn: Date;
  checkOut: Date;
  meals: MealPlan[];
}

export interface DailyMealCount {
  meal: string;
  guestCount: Guests;
}

export interface DailyReport {
  date: Date;
  meals: DailyMealCount[];
}
