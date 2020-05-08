import React, { useMemo, useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'

import auGeoJson from './geoData/australia.geo.json'
import auCityGeoJson from './geoData/australia.cities.geo.json'

const Country = ({ width, height, population = 100000 }) => {
  const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 })
  const svgRef = useRef(null)

  const zoom = useMemo(
    () =>
      d3
        .zoom()
        .scaleExtent([1, 5])
        .on('zoom', () => setTransform(d3.event.transform)),
    []
  )

  useEffect(() => {
    if (!svgRef.current) return

    d3.select(svgRef.current).call(zoom)
  }, [zoom])

  const projection = d3
    .geoMercator()
    .center([134, -26]) // GPS of location to zoom on
    .scale(500) // This is like the zoom
    .translate([width / 2, height / 2])

  const geoPath = d3.geoPath().projection(projection)

  const highPopulationAuCityFeatures = useMemo(
    () =>
      auCityGeoJson.features.filter(
        feature => feature.properties.population > population
      ),
    [population]
  )

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ background: 'lightgrey' }}
    >
      <g transform={`translate(${x}, ${y}) scale(${k})`}>
        <path
          d={geoPath(auGeoJson)}
          fill="#fff"
          stroke="#000"
          strokeWidth={0.2}
        />
        <g text-anchor="middle" font-family="sans-serif" font-size="10">
          {highPopulationAuCityFeatures.map(
            ({
              geometry: { coordinates },
              properties: { name, population },
            }) => {
              const [x, y] = projection(coordinates)

              return (
                <>
                  <circle
                    key={x}
                    cx={x}
                    cy={y}
                    r="5"
                    fill="#000"
                    onClick={() => console.log(name)}
                  />
                </>
              )
            }
          )}
        </g>
      </g>
    </svg>
  )
}

export default Country
