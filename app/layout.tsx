'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
// import markerIcon from "../node_modules/leaflet/dist/images/marker-icon.png";
// import L from 'leaflet'

// L.Marker.prototype.setIcon(L.icon({
//   iconUrl: '../node_modules/leaflet/dist/images/marker-icon.png'
// }))

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

return (
    <html suppressHydrationWarning lang="en">
      <head>
      <style>
  @import url(&apos;https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap&apos;);
</style>
      {/* <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossOrigin="anonymous"
     />
      */}


<link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"></script>


{/* <!-- Maplibre GL --> */}
{/* <link href="https://unpkg.com/maplibre-gl@2.2.1/dist/maplibre-gl.css" rel='stylesheet' 
<script src="https://unpkg.com/maplibre-gl@2.2.1/dist/maplibre-gl.js"></script>

<script src="https://unpkg.com/@maplibre/maplibre-gl-leaflet@0.0.20/leaflet-maplibre-gl.js"></script> */}

{/* <link href="https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.css" rel="stylesheet"/>
<script src="https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.js"></script> */}
{/* <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin="" /> */}
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossOrigin=""></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased lora-400`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
