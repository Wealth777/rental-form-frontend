import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/welcome.css'

export default function PageNotFound() {
  return (
    <div className="page-container">
      <div className='raduis1'></div>
      <div className='raduis2'></div>
      <div className='raduis3'></div>
      <div className='raduis4'></div>
      
      <div className="not-found-message">
        <div className="not-found-icon">404</div>
        <h1>Page Not Found</h1>
        <p className="not-found-text">
          Sorry, the page you're looking for hasn't been created yet.
        </p>
        <p className="not-found-subtitle">
          Let's get you back to the main page.
        </p>
        <Link to="/">
          <button className="home-btn">Back to Home</button>
        </Link>
      </div>
    </div>
  )
}
