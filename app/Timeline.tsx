'use client';

import { useEffect, useRef, useState } from "react";
import { Timeline, DataSet } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";


type TimelineEvent = {
  id: number;
  content: string;
  start: string; // ✅ Changed from string to number for BCE handling
  end?: string;
  description?:string
};

type TimelineProps = {
  events: TimelineEvent[];
};



const TimelineComponent = ({ events }: TimelineProps) => {

  const timelineRef = useRef<HTMLDivElement | null>(null);
  const timelineInstance = useRef<Timeline | null>(null);
  const itemsRef = useRef<DataSet<TimelineEvent>>(new DataSet());

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")



  useEffect(() => {
    if (!timelineRef.current) return;

    // ✅ Convert start dates to numbers (BCE are negative)
    const parseYear = (dateString:string) => parseInt(dateString.split("-")[1]) * (dateString.startsWith("-") ? -1 : 1);
    const timestamps = events.map((e) => parseYear(e.start));
    
    // console.log(timestamps)
    const minDate = events[timestamps.indexOf(Math.min(...timestamps))].start;
    const maxDate = events[timestamps.indexOf(Math.max(...timestamps))].start;

    if (!timelineInstance.current) {
      // Create Timeline once
      timelineInstance.current = new Timeline(timelineRef.current, itemsRef.current, {
        zoomable: true,
        start: minDate,
        end: maxDate,
        min:minDate,
        max: maxDate,
        width: '100%',
        height: '100%',
      

      });
      timelineInstance.current.on('select', function (properties) {
        // console.log('selected items: ' + properties.items);
        const id = Number(properties.items) ? Number(properties.items) : null
        if (id) {
            const result = events.filter(event=>event.id === id)
            console.log(result[0].content,result[0].description)
            setTitle(result[0].content)
            if (result[0].description) setDescription(result[0].description)
        }

      });
    } else {
      // ✅ Update the timeline window dynamically
    //   timelineInstance.current.setWindow(minDate,maxDate);
    }

    // ✅ Use `setItems()` to update events dynamically
    itemsRef.current.clear();
    itemsRef.current.add(events);
  }, [events]); // Runs whenever events change

  return <>
    <div ref={timelineRef} style={{ height: "400px" }} />
    
    <div className="bg-gray-700 text-white p-10">
        <h1 className="text-white text-3xl">{title}</h1>
        <p>{description}</p>
    </div>
    </>;
};

export default TimelineComponent;
