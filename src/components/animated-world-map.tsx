'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import { feature } from 'topojson-client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { FeatureCollection, Geometry } from 'geojson'
import type { Topology, GeometryCollection } from 'topojson-specification'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

type Location = {
  name: string
  coordinates: [number, number]
  issue: string
}

const locations: Location[] = [
  {
    name: 'India',
    coordinates: [72.8777, 19.076],
    issue: '1 child disappears every 8 minutes',
  },
  {
    name: 'United States',
    coordinates: [-77.0369, 38.9072],
    issue: '37,285 online child abuse cases in 2022',
  },
  {
    name: 'Netherlands',
    coordinates: [4.9041, 52.3676],
    issue: '82,605 EU child abuse cases hosted',
  },
  {
    name: 'Mexico',
    coordinates: [-99.1332, 19.4326],
    issue: 'Nearly 21,000 minors trafficked annually',
  },
  {
    name: 'Brazil',
    coordinates: [-47.9292, -15.7801],
    issue: '500,000 children in sex trade',
  },
  {
    name: 'South Africa',
    coordinates: [28.0473, -26.2041],
    issue: 'Estimated 30,000 trafficked yearly',
  },
  {
    name: 'Philippines',
    coordinates: [120.9842, 14.5995],
    issue: '3 million children exploited online',
  },
  {
    name: 'Thailand',
    coordinates: [100.5018, 13.7563],
    issue: '200,000 children in sex tourism',
  },
  {
    name: 'Nigeria',
    coordinates: [3.3792, 6.5244],
    issue: '43% of trafficking victims are children',
  },
  {
    name: 'Russia',
    coordinates: [37.6173, 55.7558],
    issue: '10,000+ children trafficked annually',
  },
]

export default function AnimatedWorldMap() {
  const [currentLocationIndex, setCurrentLocationIndex] = useState<number>(0)
  const [isMounted, setIsMounted] = useState(false)
  const [geoData, setGeoData] = useState<FeatureCollection<Geometry, object> | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setIsMounted(true)

    const interval = setInterval(() => {
      setCurrentLocationIndex(prevIndex => (prevIndex + 1) % locations.length)
    }, 3000)

    fetch(geoUrl)
      .then(response => response.json())
      .then((topoData: Topology) => {
        const firstObjectKey = Object.keys(topoData.objects)[0]
        const geoData = feature(
          topoData,
          topoData.objects[firstObjectKey] as GeometryCollection
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
    <div className="relative w-full overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 120, center: [0, 45] }}
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
              height="140"
              style={{ scale: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Card className="text-center bg-slate-900/90 text-white">
                <CardHeader className="p-0">
                  <CardTitle className="text-base">
                    {currentLocation.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <p className="text-sm">{currentLocation.issue}</p>
                </CardContent>
              </Card>
            </motion.foreignObject>
          </AnimatePresence>
        </Marker>
      </ComposableMap>
    </div>
  )
}