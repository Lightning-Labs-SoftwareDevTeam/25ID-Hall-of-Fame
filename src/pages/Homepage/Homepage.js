import React, { useState, useEffect } from 'react'
import inducteeService from '../../services/inducteeService'
import { useNavigate } from 'react-router-dom';
import styles from './Homepage.module.css';
import Header from '../../components/Header/Header';

function Homepage () {
  const [inductees, setInductees] = useState(null);
  const [clicked, setClicked] = useState(0);
  const navigate = useNavigate();

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

  const handleClick = (inductee) => {
    navigate('/inductee', { state: { inductee: inductee }})
  }

  const clickedTitle = () => {
    setClicked((prev) => (prev + 1));
    if (clicked == 5) {
      navigate('/login')
    }
  }

  return (
    <div className='App'>
      <div className={styles.headerDiv}>
        <button onClick={clickedTitle} className={styles.titleButton}>
          <Header text="Welcome to 25ID Hall of Fame!" />
        </button>

        <img src={require("../../assets/medal-of-honor2.png")} alt="Medal of Honor" className={styles.logo} />
      </div>

      {inductees && inductees.length > 0 ? (
        <div className={styles.inducteeList}>
          {inductees.map(inductee => (
            <button onClick={() => handleClick(inductee)}>
              {inductee.rank} {inductee.name} ({inductee.unit})
            </button>
          ))}
        </div>
      ) : (
        <p>No inductees available.</p>
      )}
    </div>
  )
}

export default Homepage
