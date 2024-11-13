import React, { useState, useEffect } from 'react'
import inducteeService from '../../services/inducteeService'

function Homepage () {
  const [inductees, setInductees] = useState(null)

  useEffect(() => {
    const getInductees = async () => {
      try {
        let updatedInductees = await inducteeService.getInductees()
        setInductees(updatedInductees)
      } catch (error) {
        console.error(error)
      }
    }

    getInductees()
  }, [])

  return (
    <div>
      <header>Welcome to 25ID Hall of Fame!</header>

      {inductees && inductees.length > 0 ? (
        <ul>
          {inductees.map(inductee => (
            <li key={inductee.id}>
              <button onClick={() => handleClick(inductee)}>
                <h3>
                  {inductee.rank} {inductee.name} ({inductee.unit})
                </h3>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No inductees available.</p>
      )}
    </div>
  )
}

export default Homepage
