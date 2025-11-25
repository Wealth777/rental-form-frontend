import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/dashboard-alt.css'

export default function DashboardAlt(){
  const navigate = useNavigate()
  const userName = 'Admin'
  const userImage = 'https://via.placeholder.com/44?text=A'

  const handleLogout = ()=>{
    // placeholder - clear token and route to login
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="alt-wrap">
      <aside className="alt-sidebar">
        <div className="brand">MyAdmin</div>
        <nav className="side-nav">
          <Link to="#" className="nav-item active">Overview</Link>
          <Link to="#" className="nav-item">Applications</Link>
          <Link to="#" className="nav-item">Users</Link>
          <Link to="#" className="nav-item">Settings</Link>
        </nav>
        <div className="sidebar-footer">
          <button className="signout" onClick={handleLogout}>Sign out</button>
        </div>
      </aside>

      <main className="alt-main">
        <header className="alt-header">
          <div className="search"> 
            <input placeholder="Search applications or users" />
          </div>
          <div className="header-actions">
            <div className="notif">🔔</div>
            <div className="profile">
              <img src={userImage} alt={userName} />
              <span>{userName}</span>
            </div>
          </div>
        </header>

        <section className="alt-content">
          <div className="alt-cards">
            <div className="stat">
              <div className="stat-title">Applications</div>
              <div className="stat-value">128</div>
            </div>
            <div className="stat">
              <div className="stat-title">New (7d)</div>
              <div className="stat-value">12</div>
            </div>
            <div className="stat">
              <div className="stat-title">Pending</div>
              <div className="stat-value">4</div>
            </div>
          </div>

          <div className="alt-table">
            <div className="table-head">
              <h3>Recent Applications</h3>
              <Link to="#" className="view-all">View all</Link>
            </div>

            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Jane Doe</td>
                  <td>jane@example.com</td>
                  <td>+1 555 1234</td>
                  <td><span className="badge pending">Pending</span></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>John Smith</td>
                  <td>john@example.com</td>
                  <td>+1 555 9876</td>
                  <td><span className="badge done">Reviewed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
