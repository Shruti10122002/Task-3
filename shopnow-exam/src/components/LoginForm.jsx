import React, { useState, useRef } from 'react'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const passwordRef = useRef(null)
  const [submittedValues, setSubmittedValues] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const password = passwordRef.current ? passwordRef.current.value : ''

    console.log('Username:', username)
    console.log('Password:', password)

    setSubmittedValues({ username, password })

    setUsername('')
    if (passwordRef.current) {
      passwordRef.current.value = ''
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-row">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="input"
          ref={passwordRef}
        />
      </div>

      <button type="submit" className="btn">
        Login
      </button>

      {submittedValues && (
        <div className="helper-text">
          <div>Last submitted username: {submittedValues.username}</div>
          <div>Last submitted password: {submittedValues.password}</div>
        </div>
      )}
    </form>
  )
}

export default LoginForm