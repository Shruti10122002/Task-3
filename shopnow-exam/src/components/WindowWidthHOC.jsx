import React, { useState, useEffect } from 'react'

// Higher-Order Component that injects windowWidth prop
export function withWindowWidth(WrappedComponent) {
  return function WithWindowWidthProps(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])

    return <WrappedComponent {...props} windowWidth={windowWidth} />
  }
}

// Example component using the HOC
const SimpleWidthDisplay = ({ windowWidth }) => (
  <div className="card">
    <p>
      <strong>Window width:</strong> {windowWidth}px
    </p>
  </div>
)

export const WindowWidthDisplay = withWindowWidth(SimpleWidthDisplay)

export default withWindowWidth