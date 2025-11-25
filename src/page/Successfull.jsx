import React from 'react'
import '../styles/welcome.css'
import { Link } from 'react-router-dom'

export default function Successfull() {
  return (
    <div className="page-container">
      <div className='raduis1'></div>
      <div className='raduis2'></div>
      <div className='raduis3'></div>
      <div className='raduis4'></div>
      
      <div className="success-message">
        <div className="success-icon">✓</div>
        <h1>Success!</h1>
        <p className="success-text">
          Your information has been received and will be attended to shortly.
        </p>
        <p className="success-subtitle">
          Thank you for submitting your details. Our team will review and get back to you soon.
        </p>

        <p className="success-text">
           Give another response <Link to={'/propertyform'} className='link'>Back to form</Link>
        </p>
      </div>
    </div>
  )
}
