import { MealOptions } from "../resource/meals";

export interface Guest {
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
  guests: Guest;
  checkIn: Date;
  checkOut: Date;
  meals: MealPlan[];
}

export interface DailyMealCount {
  meal: (typeof MealOptions)[number];
  guestCount: {
    kids: number;
    teens: number;
    adults: number;
  };
}

export interface DailyReport {
  date: Date;
  meals: DailyMealCount[];
}
