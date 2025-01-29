"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { BookingGroup, Guest, MealPlan } from "./types/booking"

export default function BookingForm() {
  const [groups, setGroups] = useState<BookingGroup[]>([])
  const [name, setName] = useState("")
  const [guests, setGuests] = useState<Guest>({ kids: 0, teens: 0, adults: 0 })
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [meals, setMeals] = useState<MealPlan>({})

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const handleAddGroup = () => {
    if (!name || !checkIn || !checkOut) return

    const newGroup: BookingGroup = {
      id: Date.now().toString(),
      name,
      guests,
      checkIn,
      checkOut,
      meals,
    }

    setGroups([...groups, newGroup])

    // Reset form
    setName("")
    setGuests({ kids: 0, teens: 0, adults: 0 })
    setCheckIn(undefined)
    setCheckOut(undefined)
    setMeals({})
  }

  const handleExport = () => {
    console.log("Exported Groups:", groups)
  }

  const nights = calculateNights()

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Order</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name">Order Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter order name" />
          </div>

          {/* Guest Numbers */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kids">Kids</Label>
              <Input
                id="kids"
                type="number"
                min="0"
                value={guests.kids}
                onChange={(e) => setGuests({ ...guests, kids: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teens">Teens</Label>
              <Input
                id="teens"
                type="number"
                min="0"
                value={guests.teens}
                onChange={(e) => setGuests({ ...guests, teens: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adults">Adults</Label>
              <Input
                id="adults"
                type="number"
                min="0"
                value={guests.adults}
                onChange={(e) => setGuests({ ...guests, adults: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Check In</Label>
              <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} className="border rounded-md" />
            </div>
            <div className="space-y-2">
              <Label>Check Out</Label>
              <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} className="border rounded-md" />
            </div>
          </div>

          {/* Meal Selection */}
          {nights > 0 &&
            Array.from({ length: nights }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Label>{`Meals for Day ${index + 1}`}</Label>
                <Select value={meals[index]} onValueChange={(value) => setMeals({ ...meals, [index]: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}

          <Button onClick={handleAddGroup} className="w-full">
            Add
          </Button>
        </CardContent>
      </Card>

      {/* Groups List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">List of Groups</h2>
        {groups.map((group) => (
          <Card key={group.id}>
            <CardContent className="p-4">
              <div className="font-medium">{group.name}</div>
              <div className="text-sm text-gray-500">
                Guests: {group.guests.kids} kids, {group.guests.teens} teens, {group.guests.adults} adults
              </div>
              <div className="text-sm text-gray-500">
                {group.checkIn.toLocaleDateString()} - {group.checkOut.toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {groups.length > 0 && (
        <Button onClick={handleExport} variant="outline" className="w-full">
          Export
        </Button>
      )}
    </div>
  )
}

