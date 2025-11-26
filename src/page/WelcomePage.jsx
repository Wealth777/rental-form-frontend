import React from 'react'
import '../styles/welcome.css'
import { Link } from 'react-router-dom'

export default function WelcomePage() {
    return (
        <>
            <div className="page-container">
                <div className='raduis1'></div>
                <div className='raduis2'></div>
                <div className='raduis3'></div>
                <div className='raduis4'></div>
                <div className='text-cont'>
                    <h2>
                        Welcome!!! My House Property Application Form No Bank Info
                    </h2>
                    <Link to={'/propertyform'}>
                        <button>
                            Open
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}
