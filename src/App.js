import React from 'react'
import logo from './logo.svg'
import './App.css'
import Circle from './Circle'
import Country from './Country'

function App() {
  return (
    <div className="App">
      {/* <Circle /> */}
      <Country width={800} height={600} />
    </div>
  )
}

export default App
