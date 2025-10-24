import React from 'react'
import './DBoard.css'

const DBoard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      <p className="dashboard-subtitle">Admin quick overview (sample data)</p>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Admin user</td>
            <td>admin@example.com</td>
          </tr>
          <tr>
            <td>Note</td>
            <td>Credentials should not be hard-coded here.</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DBoard
