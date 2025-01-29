export interface Guest {
  kids: number
  teens: number
  adults: number
}

export interface MealPlan {
  [key: number]: "breakfast" | "lunch" | "dinner" | "none"
}

export interface BookingGroup {
  id: string
  name: string
  guests: Guest
  checkIn: Date
  checkOut: Date
  meals: MealPlan
}

