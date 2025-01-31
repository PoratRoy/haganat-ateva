import React from "react";
import { Label } from "@/components/ui/Label/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/Select";
import { MealPlan } from "@/models/types/booking";
import { MealOptions } from "@/models/resource/meals";
import "./SelectMeals.css";

type SelectMealsProps = {
  index: number;
  meals: MealPlan[];
  setMeals: (meals: MealPlan[]) => void;
  date: Date;
};

const SelectMeals = ({ index, meals, setMeals, date }: SelectMealsProps) => {
  const handleMealChange = (value: string) => {
    setMeals([
      ...meals.slice(0, index),
      { ...meals[index], meal: value, date },
      ...meals.slice(index + 1),
    ]);
  };

  return (
    <div key={index} className="select-meals-container">
      <Label>{`Meals for Day ${index + 1}`}</Label>
      <Select
        value={meals[index]?.meal}
        onValueChange={(value) => handleMealChange(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select meal option" />
        </SelectTrigger>
        <SelectContent>
          {MealOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectMeals;
