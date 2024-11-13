import React, { useState, useEffect } from 'react';
import inducteeService from '../../services/inducteeService';

function Homepage() {
    const [inductees, setInductees] = useState(null);

    useEffect(() => {
        const getInductees = async () => {
            try{
                let updatedInductees = await inducteeService.getInductees();
                setInductees(updatedInductees);
            } catch (error) {
                console.error(error);
            }
        }

        getInductees()
    }, [])

    return (
        <div>
            <header>
                Welcome to 25ID Hall of Fame!
            </header>

            {inductees && inductees.length > 0 ? (
                <ul>
                    {inductees.map((inductee) => (
                        <li key={inductee.id}>
                            <h3>{inductee.name}</h3>
                            <p>{inductee.citation}</p>
                            {inductee.image && (
                                <img 
                                    src={`data:image/jpeg;base64,${inductee.image}`} 
                                    alt={`${inductee.name}'s image`} 
                                    style={{ width: '100px', height: '100px' }}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No inductees available.</p>
            )}
        </div>
    )
}

export default Homepage;