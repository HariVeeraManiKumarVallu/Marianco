'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import { feature } from 'topojson-client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GeometryCollection, Topology } from 'topojson-specification'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

type Location = {
  name: string
  coordinates: [number, number]
  crimeRate: number
}

const locations: Location[] = [
  { name: 'New York', coordinates: [-74.006, 40.7128], crimeRate: 5.2 },
  { name: 'London', coordinates: [-0.1276, 51.5074], crimeRate: 4.7 },
  { name: 'Tokyo', coordinates: [139.6917, 35.6895], crimeRate: 1.8 },
  { name: 'Sydney', coordinates: [151.2093, -33.8688], crimeRate: 3.9 },
  { name: 'Rio de Janeiro', coordinates: [-43.1729, -22.9068], crimeRate: 7.5 },
  { name: 'Cairo', coordinates: [31.2357, 30.0444], crimeRate: 6.2 },
  { name: 'Moscow', coordinates: [37.6173, 55.7558], crimeRate: 4.1 },
  { name: 'Mumbai', coordinates: [72.8777, 19.076], crimeRate: 5.8 },
  { name: 'Cape Town', coordinates: [18.4241, -33.9249], crimeRate: 8.9 },
  { name: 'Dubai', coordinates: [55.2708, 25.2048], crimeRate: 1.5 },
  { name: 'Singapore', coordinates: [103.8198, 1.3521], crimeRate: 0.7 },
  { name: 'Berlin', coordinates: [13.405, 52.52], crimeRate: 3.6 },
  { name: 'Toronto', coordinates: [-79.3832, 43.6532], crimeRate: 2.9 },
  { name: 'Mexico City', coordinates: [-99.1332, 19.4326], crimeRate: 6.8 },
  { name: 'Seoul', coordinates: [126.978, 37.5665], crimeRate: 2.3 },
]

export default function WorldMapHero() {
  const [currentLocationIndex, setCurrentLocationIndex] = useState<number>(0)
  const [isMounted, setIsMounted] = useState(false)
  const [geoData, setGeoData] = useState<GeometryCollection | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setIsMounted(true)

    const interval = setInterval(() => {
      setCurrentLocationIndex(prevIndex => (prevIndex + 1) % locations.length)
    }, 3000)

    fetch(geoUrl)
      .then(response => response.json())
      .then((topoData: Topology) => {
        const geoData = feature(
          topoData,
          topoData.objects[
            Object.keys(topoData.objects)[0]
          ] as GeometryCollection
        )
        setGeoData(geoData)
      })

    return () => {
      clearInterval(interval)
    }
  }, [])
  const currentLocation = locations[currentLocationIndex]

  if (!isMounted || !geoData) {
    return <div className="w-full h-screen bg-background" />
  }

  return (
    <div className="relative w-full bg-background text-foreground overflow-hidden ">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 120, center: [0, 45] }}

        // width={dimensions.width}
        // height={dimensions.height}
      >
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies
              .filter(geo => geo.properties.name !== 'Antarctica')
              .map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#2C3E50"
                  stroke="#EAEAEC"
                  strokeWidth={0.5}
                  className="relative"
                />
              ))
          }
        </Geographies>
        {/* <Line
          from={currentLocation.coordinates}
          to={[
            currentLocation.coordinates[0],
            currentLocation.coordinates[1] + 10,
          ]}
          stroke="#F00"
          strokeWidth={2}
          strokeLinecap="round"
        /> */}
        <Marker coordinates={currentLocation.coordinates}>
          <motion.circle
            r={4}
            fill="#FF4D4D"
            initial={{ scale: 0.5, opacity: 0.5 }}
            animate={{
              scale: [1, 2],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <circle r={4} fill="#FF4D4D" />
        </Marker>
        <Marker coordinates={currentLocation.coordinates}>
          <AnimatePresence>
            <motion.foreignObject
              key={currentLocationIndex}
              x="-64"
              y="-128"
              width="128"
              height="128"
              style={{
                scale: 0,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              // exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.7 }}
              // transition={{
              //   type: 'spring',
              //   stiffness: 300,
              //   damping: 30,
              //   duration: 0.7,
              // }}
            >
              <Card className="w-32 text-center h-auto">
                <CardHeader className="p-2 ">
                  <CardTitle>{currentLocation.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  {/* <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  > */}
                  <p className="text-xs">Child Abuse Cases </p>
                  <p className="text-[8px]">(per 100,000)</p>
                  <p className="font-semibold">
                    {currentLocation.crimeRate}
                  </p>{' '}
                  {/* </motion.div> */}
                </CardContent>
              </Card>
            </motion.foreignObject>
          </AnimatePresence>
        </Marker>
      </ComposableMap>
    </div>
  )
}
