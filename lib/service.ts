import {
  BookingGroup,
  DailyMealCount,
  DailyReport,
  Guest,
  MealPlan,
} from "@/models/types/booking";

export function calcReport(bookingGroups: BookingGroup[]): DailyReport[] {
  // Find the earliest check-in and latest check-out dates
  const firstCheckIn = new Date(
    Math.min(...bookingGroups.map((bg) => bg.checkIn.getTime()))
  );
  const lastCheckOut = new Date(
    Math.max(...bookingGroups.map((bg) => bg.checkOut.getTime()))
  );

  const report: DailyReport[] = [];
  const currentDate = new Date(firstCheckIn);

  // Iterate through each day from first check-in to last check-out
  while (currentDate <= lastCheckOut) {
    const dailyReportDate = new Date(currentDate);
    let dailyReport: DailyReport = {
      date: dailyReportDate,
      meals: [],
    };

    const meals: MealPlan[] = [];
    const guests: Guest[] = [];

    bookingGroups.map((group) => {
      group.meals.map((meal) => {
        if (meal.date.toDateString() === dailyReportDate.toDateString()) {
          meals.push(meal);
          guests.push(group.guests);
        }
      });
    });

    const dailyMeals: DailyMealCount[] = [];
    const mealOptionsSet = new Set<any>();

    meals.map((mealObj: MealPlan) => {
      const meal = mealObj.meal as any;
      if (!mealOptionsSet.has(meal)) {
        mealOptionsSet.add(meal);
        const guestsSum = guests.reduce((prev, guest) => {
          return {
            kids: prev.kids + guest.kids,
            teens: prev.teens + guest.teens,
            adults: prev.adults + guest.adults,
          };
        }, { kids: 0, teens: 0, adults: 0 });
        dailyMeals.push({
          meal,
          guestCount: guestsSum,
        });
      }
    });

    dailyReport.meals = dailyMeals;

    report.push(dailyReport);

    currentDate.setDate(currentDate.getDate() + 1);
  }
  return report;
}
