import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ProductCard from './components/ProductCard'
import LoginForm from './components/LoginForm'
import UserStatus from './components/UserStatus'
import UserDetails from './components/UserDetails'
import { WindowWidthDisplay } from './components/WindowWidthHOC'
import LoginFormik from './components/LoginFormik'

const Home = () => (
  <div className="app-container">
    <header className="app-header">
      <h1>ShopNow Demo</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/users/1">User 1 Details</Link>
        <Link to="/formik-login">Formik Login</Link>
      </nav>
    </header>

    <section className="section">
      <h2 className="section-title">Product Card (Q1)</h2>
      <ProductCard
        title="Sample Product earpods"
        price={100}
        discount={20}
        image="https://via.placeholder.com/400x240?text=Sample+Product"
      />
    </section>

    <section className="section">
      <h2 className="section-title">Login Form Controlled/Uncontrolled (Q2)</h2>
      <LoginForm />
    </section>

    <section className="section">
      <h2 className="section-title">User Status (Q3)</h2>
      <UserStatus userId={123} />
    </section>

    <section className="section">
      <h2 className="section-title">Window Width HOC (Q5)</h2>
      <WindowWidthDisplay />
    </section>
  </div>
)

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users/:id" element={<UserDetails />} />
      <Route path="/formik-login" element={<LoginFormik />} />
    </Routes>
  )
}

export default App