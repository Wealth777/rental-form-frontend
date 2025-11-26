import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'
import axios from 'axios'

export default function Dashboar() {
const navigate = useNavigate()
const [formData, setFormData] = useState([])

const token = localStorage.getItem('token')

const handleLogout = async () => {
  try {
    await axios.post('https://rental-form-backend-zap2.onrender.com/api/admin/logout', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    localStorage.removeItem('token')
    navigate('/admin/login')
  }
  catch (err) {
    alert(err.message)
  }
}

const fetchInfo = async () => {
  try {
    const res = await axios.get('https://rental-form-backend-zap2.onrender.com/api/users/form', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    setFormData(res.data?.data || [])
  } catch (err) {
    alert(err.message)
  }
}

useEffect(() => {
  if (!token) {
    navigate('/admin/login')
    return
  }

  fetchInfo()
}, [])



  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <div className="navbar-brand">
          <h2>Admin Dashboard</h2>
        </div>

        <div className="navbar-content">
          <button
            className="logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>

      </nav>

      {/* Main Content Area */}
      <div className="dashboard-content">
        <h1>Welcome Back !</h1>
        <p>Manage your application from here.</p>



        <div className="card-list">
  {Array.isArray(formData) && formData.length > 0 ? (
    formData.map((item, i) => (
      <div className="info-card" key={item._id || i}>
        <div className="card-header">
          <h3>{item.firstName} {item.lastName}</h3>
          <span className="sn-tag">{i + 1}</span>
        </div>

        <div className="card-group">
          <p><strong>Email:</strong> {item.email}</p>
          <p><strong>Phone:</strong> {item.phoneNumber}</p>
          <p><strong>Address:</strong> {item.address}</p>
          <p><strong>State and City:</strong> {item.stateAndCity}</p>
          <p><strong>Marital Status:</strong> {item.MarreitalStatus}</p>
          <p><strong>DOB:</strong> {item.dateOfBirth}</p>
        </div>

        <div className="card-group">
          <p><strong>Car:</strong> {item.ownCar}</p>
          <p><strong>Occupation:</strong> {item.occupation}</p>
          <p><strong>Document:</strong> {item.wantDocument}</p>
          <p><strong>Staying Date:</strong> {item.startStayingDate}</p>
          <p><strong>Pet:</strong> {item.pet}</p>
          <p><strong>Lease Duration:</strong> {item.leaseDuration}</p>
          <p><strong>Moving In Date:</strong> {item.movingInDate}</p>
        </div>

        <div className="card-group">
          <p><strong>Pay Rent:</strong> {item.payingForRent}</p>
          <p><strong>Application Fee:</strong> {item.applicationFee}</p>
          <p><strong>Secure House:</strong> {item.secureHouse}</p>
          <p><strong>Eviction:</strong> {item.eviction}</p>
          <p><strong>Rental Preview:</strong> {item.rentalProperty}</p>
        </div>
      </div>
    ))
  ) : (
    <div className="no-data">No application data available.</div>
  )}
</div>

      </div>
    </div>
  )
}
