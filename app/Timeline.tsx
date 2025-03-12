'use client';

import { useEffect, useRef } from "react";
import { Timeline, DataSet } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";


type TimelineEvent = {
  id: number;
  content: string;
  start: string; // ✅ Changed from string to number for BCE handling
  end?: string;
};

type TimelineProps = {
  events: TimelineEvent[];
};

const TimelineComponent = ({ events }: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const timelineInstance = useRef<Timeline | null>(null);
  const itemsRef = useRef<DataSet<TimelineEvent>>(new DataSet());

  useEffect(() => {
    if (!timelineRef.current) return;

    // ✅ Convert start dates to numbers (BCE are negative)
    const timestamps = events.map((e) => e.start);

    // ✅ Find the oldest and newest event dates numerically
    // const minDate = timestamps.length > 0 ? Math.min(...timestamps) : -10000;
    // const maxDate = timestamps.length > 0 ? Math.max(...timestamps) : 2025;

    if (!timelineInstance.current) {
      // Create Timeline once
      timelineInstance.current = new Timeline(timelineRef.current, itemsRef.current, {
        zoomable: true,
        start: -400000,
        end: 2025,
      });
    } else {
      // ✅ Update the timeline window dynamically
    //   timelineInstance.current.setWindow(minDate.toString(), maxDate.toString());
    }

    // ✅ Use `setItems()` to update events dynamically
    itemsRef.current.clear();
    itemsRef.current.add(events);
  }, [events]); // Runs whenever events change

  return <div ref={timelineRef} style={{ height: "400px" }} />;
};

export default TimelineComponent;
