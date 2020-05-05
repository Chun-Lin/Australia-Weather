import React, { useRef, useEffect, useState, useMemo } from 'react'
import * as d3 from 'd3'

const Circle = () => {
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

  return (
    <svg
      ref={svgRef}
      width="500"
      height="500"
      style={{ background: 'lightgrey' }}
    >
      <g transform={`translate(${x}, ${y}) scale(${k})`}>
        <circle cx="150" cy="200" r="20" fill="blue" />
      </g>
    </svg>
  )
}

export default Circle
