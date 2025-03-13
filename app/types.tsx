export type TimelineEvent = {
  id: number;
  content: string;
  start: string; 
  end?: string;
  description?: string;
  position?: number[]; // ✅ Added position attribute [lat, lng]
  path?: [number, number][];   // ✅ Percorso formato da N punti
};

export type TimelineProps = {
  events: TimelineEvent[];
};