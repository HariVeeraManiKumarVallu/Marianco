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
import { GeometryCollection, Topology } from 'topojson-specification'

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
    <div className="relative w-full overflow-hidden ">
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
                  // fill="#EAEAEC"
                  // stroke="#2C3E50"
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
              height="140"
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
              <Card className="text-center bg-slate-900/90 text-white">
                <CardHeader className="p-0">
                  <CardTitle className="text-base">
                    {currentLocation.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  {/* <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  > */}
                  {/* <p className="text-xs">Child Abuse Cases </p>
                  <p className="text-[8px]">(per 100,000)</p> */}
                  <p className="text-sm">{currentLocation.issue}</p>{' '}
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
