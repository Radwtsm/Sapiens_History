'use client'

import { useState } from "react";
import TimelineComponent from "./Timeline";
import { events as RawEvents } from "./events";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"





export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter events dynamically
  const filteredEvents : any = selectedCategory
    ? RawEvents.filter((event) => event.categories.includes(selectedCategory))
    : RawEvents;

  // Extract unique categories for filtering
  const uniqueCategories = Array.from(
    new Set(RawEvents.flatMap((event) => event.categories))
  );



  return (
    <div>
      <h1 className="text-5xl">Historical Timeline</h1>
      <Select onValueChange={(val)=> setSelectedCategory(val)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="SELECT" />
        </SelectTrigger>
        <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {uniqueCategories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
        </SelectContent>
      </Select>

      <TimelineComponent events={filteredEvents} />
    </div>
  );
}
