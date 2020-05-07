import React from 'react'
import * as d3 from 'd3'

import auGeoJson from './geoData/australia.geo.json'

const Country = () => {
  const projection = d3
    .geoMercator()
    .center([149, -30]) // GPS of location to zoom on
    .scale(500) // This is like the zoom

  const geoPath = d3.geoPath().projection(projection)

  return (
    <svg width="800" height="600">
      <g>
        <path d={geoPath(auGeoJson)} />
        <g text-anchor="middle" font-family="sans-serif" font-size="10">
          <g
            transform={`translate(${projection([144.9632, -37.814]).join(
              ','
            )})`}
          >
            <circle r="2" fill="white"></circle>
            <text y="-6" fill="white">
              MelBourne
            </text>
          </g>
          <g
            transform={`translate(${projection([151.20732, -33.86785]).join(
              ','
            )})`}
          >
            <circle r="10" fill="transparent" stroke="white"></circle>
            <text y="-6" fill="white">
              Sydney
            </text>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Country
