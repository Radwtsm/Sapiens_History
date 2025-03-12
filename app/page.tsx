'use client'

import { useState } from "react";
import TimelineComponent from "./Timeline";
import { events as RawEvents } from "./events";
// import { Select } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
// import { Select } from "@radix-ui/react-select";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter events dynamically
  const filteredEvents = selectedCategory
    ? RawEvents.filter((event) => event.categories.includes(selectedCategory))
    : RawEvents;

  // Extract unique categories for filtering
  const uniqueCategories = Array.from(
    new Set(RawEvents.flatMap((event) => event.categories))
  );


  const { setTheme } = useTheme()
  // setTheme("dark")

  return (
    <div>
      <h1>Historical Timeline</h1>
      {/* <Select>

      </Select> */}
      {/* <Button>ciao</Button> */}



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
          {/* <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem> */}
        </SelectContent>
      </Select>



      {/* Dropdown for selecting category */}
      {/* <select
        onChange={(e) => setSelectedCategory(e.target.value || null)}
        value={selectedCategory || ""}
      >
        <option value="">All Categories</option>
        {uniqueCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select> */}

      {/* Timeline Component */}
      <TimelineComponent events={filteredEvents} />
    </div>
  );
}
