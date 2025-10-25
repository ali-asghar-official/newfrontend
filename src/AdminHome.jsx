import React, { useContext, useEffect, useState } from "react";
import "./AdminHome.css";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './AuthContext'
import { API_URL } from './config'

function AdminHome() {

const navigate = useNavigate();


  const { logout } = useContext(AuthContext)

  const handleLogout = () => {
    if (typeof logout === 'function') logout()
    alert("Logged out successfully!")
    navigate('/signup')
  }


  const stats = {
    totalSales: "120,000 PKR",
    totalOrders: 450,
    totalCustomers: 320,
  };
  const [dynamicStats, setDynamicStats] = useState({ totalSales: null, totalOrders: null, totalCustomers: null })
  const [salesData, setSalesData] = useState([])

  useEffect(() => {
    const tryFetch = async (urls) => {
      for (const url of urls) {
        try {
          const res = await fetch(url)
          if (!res.ok) continue
          const json = await res.json()
          return json
        } catch (e) {
          // try next
        }
      }
      return null
    }

    const loadStats = async () => {
      // products
      const productsResp = await tryFetch([
        `${API_URL}/api/products/list`,
        `${API_URL}/product/list`
      ])

      // users
      const usersResp = await tryFetch([
        `${API_URL}/api/users/list`,
        `${API_URL}/users/list`,
        `${API_URL}/user/list`
      ])

      // orders
      const ordersResp = await tryFetch([
        `${API_URL}/api/orders/list`,
        `${API_URL}/orders/list`,
        `${API_URL}/order/list`
      ])

        // fallback: read orders/users from localStorage if backend not available
        let localOrders = null
        try { localOrders = JSON.parse(localStorage.getItem('orders') || 'null') } catch(e){ localOrders = null }
        const ordersData = ordersResp || (Array.isArray(localOrders) ? { list: localOrders } : null)

      // derive stats
      let totalOrders = 0
      let totalCustomers = null
      let totalSales = null
      let distribution = {}

      if (ordersData && Array.isArray(ordersData.list || ordersData)) {
        const orders = ordersData.list || ordersData
        totalOrders = orders.length
        // totalSales sum order.total or order.amount
        totalSales = orders.reduce((acc, o) => acc + Number(o.total || o.amount || 0), 0)
        // customer count
        const customers = new Set(orders.map(o => o.user || o.userId || o.customer))
        totalCustomers = customers.size || (usersResp && Array.isArray(usersResp.list || usersResp) ? (usersResp.list || usersResp).length : null)
        // distribution from orders items
        for (const o of orders) {
          const items = o.items || o.products || []
          for (const it of items) {
            const cat = it.category?.title || it.category || it.categoryId || 'Other'
            distribution[cat] = (distribution[cat] || 0) + (Number(it.price || it.amount || 0) * (it.quantity || it.qty || 1) || 0)
          }
        }
      } else if (productsResp && Array.isArray(productsResp.list || productsResp)) {
        const products = productsResp.list || productsResp
        totalOrders = products.length
        totalCustomers = usersResp && Array.isArray(usersResp.list || usersResp) ? (usersResp.list || usersResp).length : null
        // approximate distribution by product price sum per category
        for (const p of products) {
          const cat = p.category?.title || p.category || 'Other'
          distribution[cat] = (distribution[cat] || 0) + Number(p.price || 0)
        }
        totalSales = Object.values(distribution).reduce((a,b)=>a+b,0)
      }

      // format distribution for chart
      const salesDataArr = Object.keys(distribution).map(k => ({ name: k, value: Math.round(distribution[k]) }))

      setDynamicStats({ totalSales, totalOrders, totalCustomers })
      setSalesData(salesDataArr)
    }

    loadStats()
  }, [])

  return (
    <div className="dashboard-container">
      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <p className="dashboard-subtitle">Overview of current performance</p>

      {/* Quick Links */}
      <div className="quick-links">
        <div className="link-card" onClick={() => navigate('/ProductList')}>📦 Manage Products</div>
        <div className="link-card" onClick={() => navigate('/CategoryList')}>📂 Manage Categories</div>
        <div className="link-card" onClick={() => navigate('/BrandList')}>🏷 Manage Brands</div>
        <div className="link-card" onClick={() => navigate('/TodoList')}>📝 Admin Tasks</div>
      </div>

      {/* Stats Boxes */}
      <div className="stats-grid">
        <div className="card">
          <h3>💰 Total Sales</h3>
          <h2>Rs. {dynamicStats.totalSales != null ? dynamicStats.totalSales : stats.totalSales}</h2>
        </div>
        <div className="card">
          <h3>📦 Total Orders</h3>
          <h2>{dynamicStats.totalOrders != null ? dynamicStats.totalOrders : stats.totalOrders}</h2>
        </div>
        <div className="card">
          <h3>👥 Total Customers</h3>
          <h2>{dynamicStats.totalCustomers != null ? dynamicStats.totalCustomers : stats.totalCustomers}</h2>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="chart-container">
        <h2>Sales Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
                {salesData && salesData.length > 0 ? (
                  <Pie
                    data={salesData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {salesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} />
                    ))}
                  </Pie>
                ) : (
                  <Pie data={[{ name: 'No data', value: 1 }]} dataKey="value" nameKey="name" outerRadius={80} fill="#ddd" />
                )}
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>




  );
}

export default AdminHome;