import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class='relative h-32 w-32 bg-red-300'>
        <div class='absolute top-16 right-0'>
          <img src="../public/Frisk.webp" alt="player" />
        </div>
      </div>
    </>
  )
}

export default App
