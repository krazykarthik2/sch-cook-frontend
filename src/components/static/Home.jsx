import React from 'react'
import { FaBars, FaLine } from 'react-icons/fa'
import { FaLinesLeaning } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <main>
        <h1>Welcome to Time Table Cooker</h1>
        <Link to="/menu" className='btn flex w-min absolute bottom-0 left-0 m-5'>
          <FaBars size={45}/>
        </Link>
    </main>
  )
}

export default Home