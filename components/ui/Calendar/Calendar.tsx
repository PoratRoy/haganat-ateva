"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import "./Calendar.css"
import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("calendar", className)}
      classNames={{
        months: cn("calendar-months", classNames?.months),
        month: cn("calendar-month", classNames?.month),
        caption: cn("calendar-caption", classNames?.caption),
        caption_label: cn("calendar-caption-label", classNames?.caption_label),
        nav: cn("calendar-nav", classNames?.nav),
        nav_button: cn("calendar-nav-button", classNames?.nav_button),
        nav_button_previous: cn("calendar-nav-button-previous", classNames?.nav_button_previous),
        nav_button_next: cn("calendar-nav-button-next", classNames?.nav_button_next),
        table: cn("calendar-table", classNames?.table),
        head_row: cn("calendar-head-row", classNames?.head_row),
        head_cell: cn("calendar-head-cell", classNames?.head_cell),
        row: cn("calendar-row", classNames?.row),
        cell: cn("calendar-cell", classNames?.cell),
        day: cn("calendar-day", classNames?.day),
        day_range_end: cn("calendar-day-range-end", classNames?.day_range_end),
        day_selected: cn("calendar-day-selected", classNames?.day_selected),
        day_today: cn("calendar-day-today", classNames?.day_today),
        day_outside: cn("calendar-day-outside", classNames?.day_outside),
        day_disabled: cn("calendar-day-disabled", classNames?.day_disabled),
        day_range_middle: cn("calendar-day-range-middle", classNames?.day_range_middle),
        day_hidden: cn("calendar-day-hidden", classNames?.day_hidden),
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
