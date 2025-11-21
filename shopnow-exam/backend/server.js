// Q7, Q8, Q9, Q10 + /users for Q4

const fs = require('fs')
const path = require('path')
const http = require('http')

const express = require('express')
const cors = require('cors')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

// ----- Q7: Logging and core HTTP server -----

const LOG_DIR = path.join(__dirname, 'logs')
const LOG_FILE = path.join(LOG_DIR, 'app.log')

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true })
}

fs.appendFileSync(LOG_FILE, 'App started\n', 'utf8')

const coreServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ status: 'running' }))
})

coreServer.listen(5000, () => {
  console.log('Core HTTP server running on http://localhost:5000')
})

// ----- Load users for /users/:id (Q4) -----

const usersFilePath = path.join(__dirname, 'users.json')
let users = []

try {
  const fileContent = fs.readFileSync(usersFilePath, 'utf8')
  users = JSON.parse(fileContent)
} catch (err) {
  console.error('Error reading users.json:', err)
  users = []
}

// ----- Express app for Q4, Q9, Q10 -----

const app = express()
const PORT = 4000
const JWT_SECRET = 'verysecretkey'

// Middleware
app.use(cors())
app.use(express.json())

// Global logging middleware (Q9)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// ----- Q4: /users/:id -----

// app.get('/users/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10)
//   const user = users.find((u) => u.id === id)
//   if (!user) {
//     return res.status(404).json({ error: 'User not found' })
//   }
//   res.json(user)
// })

// ----- Q4: /users/:id -----
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)

  // If you have users loaded from users.json, try to find it
  const userFromFile = Array.isArray(users)
    ? users.find((u) => u.id === id)
    : null

  // Fallback demo user if not found or users array empty
  const user =
    userFromFile ||
    {
      id,
      name: 'Demo User',
      email: 'demo.user@example.com'
    }

  res.json(user)
})

// ----- Q9: Products API with validation -----

let products = [
  { id: 1, name: 'Sample Product', price: 100 }
]

// GET /products
app.get('/products', (req, res) => {
  res.json(products)
})

// POST /products with express-validator
app.post(
  '/products',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be a positive number')
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, price } = req.body
    const newProduct = {
      id: products.length + 1,
      name,
      price: parseFloat(price)
    }
    products.push(newProduct)
    res.status(201).json(newProduct)
  }
)

// ----- Q10: JWT Authentication -----

// Static user
const STATIC_USER = {
  email: 'admin@test.com',
  password: '12345'
}

// /login route to generate JWT
app.post('/login', (req, res) => {
  const { email, password } = req.body

  if (email === STATIC_USER.email && password === STATIC_USER.password) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' })
    return res.json({ token })
  }

  return res.status(401).json({ error: 'Invalid credentials' })
})

// JWT validation middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token missing' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' })
    }
    req.user = user
    next()
  })
}

// Protected route /dashboard
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({
    message: 'Welcome to dashboard',
    user: req.user.email
  })
})

// ----- Q8: Async JS – callback, Promise, async/await -----

function fetchDataCallback(callback) {
  setTimeout(() => {
    const data = 'Fetched data using callback'
    callback(null, data)
  }, 500)
}

function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    fetchDataCallback((err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

async function fetchDataAsync() {
  try {
    const data = await fetchDataPromise()
    console.log('Async/Await:', data)
  } catch (err) {
    console.error('Error in async/await version:', err)
  }
}

// Demonstrate all three versions
fetchDataCallback((err, data) => {
  if (err) {
    console.error('Callback error:', err)
  } else {
    console.log('Callback:', data)
  }
})

fetchDataPromise()
  .then((data) => {
    console.log('Promise:', data)
  })
  .catch((err) => {
    console.error('Promise error:', err)
  })

fetchDataAsync()

// ----- Start Express server -----

app.listen(PORT, () => {
  console.log(`Express API server running on http://localhost:${PORT}`)
})