import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

function Inductee() {
    const location = useLocation();
    const [inductee, setInductee] = useState(null);

    useEffect(() => {
        try {
            updatedInductee = location.state.inductee;
            setInductee(inductee);
        } catch (error) {
            console.error(error);
        }
    }, [])

    return (
        <div>
            { !inductee ?
            <LoadingScreen />
            :
            <div>
                <h1>{inductee.rank} {inductee.name}</h1>

                { inductee.image &&
                <img 
                    src={`data:image/jpeg;base64,${inductee.image}`} 
                    alt={`${inductee.name}'s image`} 
                    style={{ width: '100px', height: '100px' }}
                />
                }
                
                { inductee.place &&
                <h2>{inductee.place}</h2>
                }

                { inductee.date &&
                <h2>{inductee.date}</h2>
                }

                <p>{inductee.citation}</p>
            </div>
            }
        </div>
    )
}

export default Inductee;