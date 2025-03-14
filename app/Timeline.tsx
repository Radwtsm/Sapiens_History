'use client';

import { useEffect, useRef, useState } from "react";
import { Timeline, DataSet } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import dynamic from "next/dynamic";
// import Resizabl
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
// import Script from "next/script";
// import MapTime from "./MapTime";



const Map = dynamic(() => import("./Map"), { ssr: false });
// const Mappone = dynamic(() => import("./MapTime"), { ssr: false });
export type TimelineEvent = {
  id: number;
  content: string;
  start: string;
  end?: string;
  description?: string;
  position?: [number, number]; // ✅ Added position attribute [lat, lng]
  path?:[number, number][]
};



type TimelineProps = {
  events: TimelineEvent[];
};

const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  // Extract year, making sure to handle negative years (BCE)
  const year = parseInt(dateString, 10);

  return year < 0 ? `${Math.abs(year)} A.C` : `${year} D.C`;
};


const TimelineComponent = ({ events }: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const timelineInstance = useRef<Timeline | null>(null);
  const itemsRef = useRef<DataSet<TimelineEvent>>(new DataSet());

  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const parseYear = (dateString: string) => parseInt(dateString.split("-")[1]) * (dateString.startsWith("-") ? -1 : 1);
    const timestamps = events.map((e) => parseYear(e.start));

    const minDate = events[timestamps.indexOf(Math.min(...timestamps))].start;
    const maxDate = events[timestamps.indexOf(Math.max(...timestamps))].start;

    if (!timelineInstance.current) {
      timelineInstance.current = new Timeline(timelineRef.current, itemsRef.current, {
        zoomable: true,
        start: minDate,
        end: maxDate,
        min: minDate,
        max: maxDate,
        width: "100%",
        height: "100%",
      });

      timelineInstance.current.on("select", function (properties) {
        const id = Number(properties.items) ? Number(properties.items) : null;
        if (id) {
          const event = events.find((e) => e.id === id);
          if (event) {
            setSelectedEvent(event); // ✅ Update the selected event
          }
        }
      });
    }

    itemsRef.current.clear();
    itemsRef.current.add(events);
  }, [events]);


  const moveTimeline = (type: "left-extreme" | "right-extreme" | "left" | "right") => {
    if (!timelineInstance.current) return;

    const range = timelineInstance.current.getWindow();
    const interval = range.end.getTime() - range.start.getTime();

    switch (type) {
      case "left-extreme":
        timelineInstance.current.moveTo(events[0].start);
        break;
      case "right-extreme":
        timelineInstance.current.moveTo(events[events.length - 1].start);
        break;
      case "left":
        timelineInstance.current.setWindow(range.start.getTime() - interval * 0.5, range.end.getTime() - interval * 0.5);
        break;
      case "right":
        timelineInstance.current.setWindow(range.start.getTime() + interval * 0.5, range.end.getTime() + interval * 0.5);
        break;
    }
  };

  return (
    <>

<ToggleGroup className="w-xl" type="single">
  <ToggleGroupItem value="start" onClick={() => moveTimeline("left-extreme")}>{"<<"}</ToggleGroupItem>
  <ToggleGroupItem value="left" onClick={() => moveTimeline("left")}>{"<"}</ToggleGroupItem>
  <ToggleGroupItem value="right" onClick={() => moveTimeline("right")}>{">"}</ToggleGroupItem>
  <ToggleGroupItem value="end" onClick={() => moveTimeline("right-extreme")}>{">>"}</ToggleGroupItem>
</ToggleGroup>
    {/* <div className="flex justify-between p-2">
        <button onClick={() => moveTimeline("left-extreme")} className="px-4 py-2 bg-gray-700 text-white rounded">{"<<"}</button>
        <button onClick={() => moveTimeline("left")} className="px-4 py-2 bg-gray-500 text-white rounded">{"<"}</button>
        <button onClick={() => moveTimeline("right")} className="px-4 py-2 bg-gray-500 text-white rounded">{">"}</button>
        <button onClick={() => moveTimeline("right-extreme")} className="px-4 py-2 bg-gray-700 text-white rounded">{">>"}</button>
      </div> */}
      <div ref={timelineRef} style={{ height: "400px" }} />

      <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
  <div style={{ height: "500px", overflowY: "auto" }} className="p-10">
    {selectedEvent ? (
      <>
        <h1 className="text-white text-3xl pb-2">{selectedEvent.content}</h1>
        <Separator />

        <p>{formatDate(selectedEvent.start)} {selectedEvent.end ? " - " + formatDate(selectedEvent.end) : ""}</p>

        <p>{selectedEvent.description}</p>

      </>
    ) : (
      <p>Seleziona un evento per visualizzare i dettagli</p>
    )}
  </div>
</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
        {/* <script src=""
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossOrigin="anonymous"
     ></script> */}
     <script async src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        {/* <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></Script> */}


          <Map selectedEvent={selectedEvent} />
          {/* <Mappone selectedEvent={selectedEvent}/> */}
        </ResizablePanel>
      </ResizablePanelGroup>




    </>
  );
};

export default TimelineComponent;
