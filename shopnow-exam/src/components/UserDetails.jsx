import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const UserDetails = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:4000/users/${id}`)
        if (!res.ok) {
          throw new Error('Failed to fetch user')
        }
        const data = await res.json()
        setUser(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  if (loading)
    return (
      <div className="page-container">
        <p>Loading user...</p>
      </div>
    )
  if (error)
    return (
      <div className="page-container">
        <p>Error: {error}</p>
      </div>
    )
  if (!user)
    return (
      <div className="page-container">
        <p>No user found.</p>
      </div>
    )

  return (
    <div className="page-container">
      <header className="app-header">
        <h1>User Details</h1>
        <nav>
          <Link to="/">Back to Home</Link>
        </nav>
      </header>

      <div className="card card-wide">
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  )
}

export default UserDetails