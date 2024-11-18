import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastRef } from '../../context/toastContext/toastContext';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import DeleteButton from '../../components/DeleteButton/DeleteButton';
import inducteeService from '../../services/inducteeService';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { useAuth } from '../../context/authContext';
import InducteeDTO from '../../dtos/inducteeDTO/inducteeDTO';
import Header from '../../components/Header/Header';
import styles from './AdminHomepage.module.css';


function AdminHomepage() {
    const [inductees, setInductees] = useState(null);
    const [loading, setLoading] = useState(false);
    const { userToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userToken) {
            navigate('/login');
            return;
        }
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
        navigate('/admin/inductee', {state: {inductee: new InducteeDTO(), addition: true}})
    }

    return (
        <div>
            { loading ?
            <LoadingScreen />
            :
            <div className='App'>
                <Header text="Welcome to the Admin Homepage!" />

                <GeneralButton 
                    text="Add Inductee"
                    onClick={navigateAddInductee}
                />

                {inductees && inductees.length > 0 ? (
                    <>
                        {inductees.map((inductee) => (
                            <div key={inductee.id} className={styles.adminList}>
                                <h3>{inductee.rank} {inductee.name} ({inductee.unit})</h3>
                                <div className={styles.div1}>
                                    <div className={styles.div2}>
                                        <GeneralButton 
                                            text="Edit"
                                            onClick={() => navigateEditInductee(inductee)}
                                        />
                                        <DeleteButton
                                            text="Delete"
                                            onClick={() => confirmDeleteInductee(inductee)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>No inductees available.</p>
                )}
            </div>
            }
        </div>
    )
}

export default AdminHomepage;