import {
  BookingGroup,
  DailyMealCount,
  DailyReport,
} from "@/models/types/booking";

export function calcReport(groups: BookingGroup[]): DailyReport[] {
  // Create a deep copy of the groups array and its contents
  const bookingGroups: BookingGroup[] = groups.map((group) => ({
    ...group,
    guests: { ...group.guests },
    meals: group.meals.map((meal) => ({ ...meal })),
  }));

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

    const dailyMeals: DailyMealCount[] = [];

    // Find all meals for the current day
    bookingGroups.map((group) => {
      group.meals.map((meal) => {
        if (meal.date.toDateString() === dailyReportDate.toDateString()) {
          // check for duplicates
          if (dailyMeals.find((m) => m.meal === meal.meal)) {
            // if so, just add the guests
            const index = dailyMeals.findIndex((m) => m.meal === meal.meal);
            const dailyMealGuests = dailyMeals[index].guestCount;
            dailyMealGuests.adults += group.guests.adults;
            dailyMealGuests.teens += group.guests.teens;
            dailyMealGuests.kids += group.guests.kids;
          } else {
            // if not, add the meal and guests
            dailyMeals.push({
              meal: meal.meal,
              guestCount: group.guests,
            });
          }
        }
      });
    });

    dailyReport.meals = dailyMeals;
    report.push(dailyReport);
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return report;
}
