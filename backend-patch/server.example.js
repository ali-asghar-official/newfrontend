/*
  Example entrypoint for a Node/Express + Mongoose backend.
  - Reads MONGODB_URI from env
  - Uses PORT from env (fallback 5000)
  - Adds simple CORS config driven by ALLOWED_ORIGIN
  - Mounts existing app/router if you already have one

  Instructions:
  - If your repo already has an `app` or `server` file, adapt the shown patterns rather than replacing everything.
  - Save as server.js (or merge pieces into your existing entry file).
*/

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// Use environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://aliasghar:Ali786786@cluster0.dygjva1.mongodb.net/ecommerce?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*'

app.use(express.json({ limit: '10mb' }))

// Configure CORS
app.use(cors({ origin: ALLOWED_ORIGIN }))

// Basic health endpoint
app.get('/_health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }))

// Option A: If your project already exports an `app` (express instance), import and use it:
// try { const existingApp = require('./app'); app.use(existingApp) } catch(e) { /* not present */ }

// Option B: Simple default route implementations (safe fallback) -- keep if your existing repo lacks these
// These are minimal and intended to avoid 404s for the frontend while you map into your real controllers.
const Router = express.Router()

// Example product list
Router.get('/product/list', async (req, res) => {
  // If you have Mongoose models, use them here. This returns an empty list by default.
  res.json({ list: [] })
})

// Example product single
Router.get('/product/single', async (req, res) => {
  const id = req.query.id
  res.json({ item: null })
})

// Orders add
Router.post('/api/orders/add', async (req, res) => {
  // Save order with your model; here we echo it for quick testing
  const order = req.body
  console.log('Order received (example):', order)
  res.status(201).json({ message: 'order received (example)', order })
})

// Orders list
Router.get('/api/orders/list', async (req, res) => {
  res.json({ list: [] })
})

// Users login (example)
Router.post('/api/users/login', async (req, res) => {
  const { email } = req.body
  // NEVER do this in production — it's only an example fallback that returns a fake user
  return res.json({ token: 'dev-token', user: { email, role: 'user', id: 'dev-user' } })
})

app.use('/', Router)

// Connect to MongoDB and start
async function start() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connected to MongoDB')

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()
