import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import Header from '../../components/Header/Header';
import styles from './Inductee.module.css';

function Inductee() {
    const location = useLocation();
    const [inductee, setInductee] = useState(null);

    useEffect(() => {
        try {
            const updatedInductee = location.state.inductee;
            setInductee(updatedInductee);
        } catch (error) {
            console.error(error);
        }
    }, [])

    return (
        <>
            { !inductee ?
            <LoadingScreen />
            :
            <div className='App'>
                <Header text={`${inductee.rank} ${inductee.name}`} />

                { inductee.image &&
                <img
                    src={`data:image/jpeg;base64,${inductee.image}`} 
                    alt={`${inductee.name}'s image`} 
                    style={{ width: 'auto', height: 'auto', maxWidth: '1000px', maxHeight: '600px' }}
                />
                }
                
                { inductee.place &&
                <h2 className={styles.placeDateText}>
                    {inductee.place}
                </h2>
                }

                { inductee.date &&
                <h2 className={styles.placeDateText}>
                    {inductee.date}
                </h2>
                }

                <p className={styles.citationText}>{inductee.citation}</p>
            </div>
            }
        </>
    )
}

export default Inductee;