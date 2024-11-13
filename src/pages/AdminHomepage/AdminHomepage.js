import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastRef } from '../../context/toastContext/toastContext';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import inducteeService from '../../services/inducteeService';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { useAuth } from '../../context/authContext';


function AdminHomepage() {
    const [inductees, setInductees] = useState(null);
    const [loading, setLoading] = useState(false);
    const { userToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getInductees()
    }, [])

    const getInductees = async () => {
        setLoading(true);
        try{
            let updatedInductees = await inducteeService.getInductees();
            setInductees(updatedInductees);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const navigateEditInductee = (inductee) => {
        navigate('/admin/inductee', {state: {inductee: inductee}});
    }

    const confirmDeleteInductee = (inductee) => {
        console.log(inductee)
        toastRef.current('Are you sure you want to delete this inductee?',
            'info',
            async () => {
                await deleteIndex(inductee.id)
            }
        )
    }

    const deleteIndex = async (id) => {
        setLoading(true);
        try {
            await inducteeService.deleteInductee(userToken, id)
            await getInductees()
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const navigateAddInductee = () => {
        let newInductee = {
            "name": ''
        }
        navigate('/admin/inductee', {state: {inductee: newInductee}})
    }

    return (
        <div>
            { loading ?
            <LoadingScreen />
            :
            <div>
                <header>
                    Welcome to the admin homepage!
                </header>

                <GeneralButton 
                    text="Add Inductee"
                    onClick={navigateAddInductee}
                />

                {inductees && inductees.length > 0 ? (
                    <ul>
                        {inductees.map((inductee) => (
                            <li key={inductee.id}>
                                <h3>{inductee.rank} {inductee.name} ({inductee.unit})</h3>
                                <GeneralButton 
                                    text="Edit"
                                    onClick={() => navigateEditInductee(inductee)}
                                />
                                <GeneralButton
                                    text="Delete"
                                    onClick={() => confirmDeleteInductee(inductee)}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No inductees available.</p>
                )}
            </div>
            }
        </div>
    )
}

export default AdminHomepage;