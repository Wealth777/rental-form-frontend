import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'
import axios from 'axios'

export default function Dashboar() {
const navigate = useNavigate()
const [userName] = useState('')
const [userImage] = useState('')
const [formData, setFormData] = useState([])

const token = localStorage.getItem('token')

const handleLogout = async () => {
  try {
    await axios.post('http://localhost:6778/api/admin/logout', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    localStorage.removeItem('token')
    navigate('/admin/login')
  }
  catch (err) {
    console.log(err.message)
  }
}

const fetchInfo = async () => {
  try {
    const res = await axios.get('http://localhost:6778/api/users/form', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    setFormData(res.data?.data || [])
  } catch (err) {
    console.log(err.message)
  }
}

useEffect(() => {
  fetchInfo()
}, [])


  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <div className="navbar-brand">
          <h2>Admin Dashboard</h2>
        </div>

        <div className="navbar-content">
          <div className="navbar-user">
            <img
              src={userImage}
              alt={userName}
              className="user-avatar"
            />
            <span className="user-name">{userName}</span>
          </div>

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
        <h1>Welcome Back, {userName}!</h1>
        <p>Manage your application from here.</p>

        <div className="content-grid">
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>State and City</th>
                <th>Marital Status</th>
                <th>DOB</th>
                <th>Car</th>
                <th>Occupation</th>
                <th>Document</th>
                <th>Staying Date</th>
                <th>Pet</th>
                <th>Lease Duration</th>
                <th>Moving In Date</th>
                <th>Pay Rent</th>
                <th>Application fee</th>
                <th>Secure House</th>
                <th>Eviction</th>
                <th>Rental Preview</th>
                <th>Signature</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(formData) && formData.length > 0 ? (
                formData.map((item, i) => (
                  <tr key={item._id || i}>
                    <td data-label='S/N'>{i + 1}</td>
                    <td data-label='Full Name'>{item.firstName} {item.lastName}</td>
                    <td data-label='Email'>{item.email}</td>
                    <td data-label='Phone No'>{item.phoneNumber}</td>
                    <td data-label='Address'>{item.address}</td>
                    <td data-label='State & City'>{item.stateAndCity}</td>
                    <td data-label='Marital Statu'>{item.MarreitalStatus}</td>
                    <td data-label='DOB'>{item.dateOfBirth}</td>
                    <td data-label='Car'>{item.ownCar}</td>
                    <td data-label='Occupation'>{item.occupation}</td>
                    <td data-label='Document'>{item.wantDocument}</td>
                    <td data-label='Staying Date'>{item.startStayingDate}</td>
                    <td data-label='Pet'>{item.pet}</td>
                    <td data-label='Lease Duration'>{item.leaseDuration}</td>
                    <td data-label='Moving In Date'>{item.movingInDate}</td>
                    <td data-label='Pay Rent'>{item.payingForRent}</td>
                    <td data-label='Application fee'>{item.applicationFee}</td>
                    <td data-label='Secure House'>{item.secureHouse}</td>
                    <td data-label='Eviction'>{item.eviction}</td>
                    <td data-label='Rental Preview'>{item.rentalProperty}</td>
                    <td data-label='Signature'>{item.signature}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={21} style={{ textAlign: 'center', padding: '20px' }}>
                    No application data available.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}
