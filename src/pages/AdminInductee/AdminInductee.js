import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toastRef } from '../../context/toastContext/toastContext';
import { useAuth } from '../../context/authContext';
import inducteeService from '../../services/inducteeService';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import Form from '../../components/Form/Form';
import FormField from '../../components/Form/FormField';


function AdminInductee() {
  const [inductee, setInductee] = useState(null);
  const [isAddition, setIsAddition] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { userToken } = useAuth();

  useEffect(() => {
    setLoading(true);
    if (!userToken) {
      navigate('/login');
      return;
    }

    try {
      const updatedInductee = location.state.inductee;
      setInductee(updatedInductee);
    } catch (error) {
      console.error('Error:', error);
      navigate('/admin/home');
    } finally {
        setLoading(false);
    }

    try{
        const addition = location.state.addition;
        setIsAddition(addition);
    } catch {
        console.log("Edit")
    }
  }, []);

  const updateDatabase = async (e) => {
    e.preventDefault()
    if (!userToken) {
      navigate('/login');
      return;
    }

    setLoading(true);
    const verbiage = isAddition ? 'adding' : 'updating'
    try {
        const response = isAddition
            ? await inducteeService.addInductee(userToken, inductee)
            : await inducteeService.editInductee(userToken, inductee.id, inductee)

        if (response) {
            navigate('/admin/home');
        } else {
            toastRef.current(`Error ${verbiage} inductee`);
        }
    } catch (error) {
        toastRef.current(`Error ${verbiage} inductee: ${error.message}`);
    } finally {
        setLoading(false);
    }
  };

  const fields = [
    { type: 'text', text: 'Name: ', id: 'name', value: inductee?.name || '', required: true, maxLength: 100 },
    { type: 'text', text: 'Rank: ', id: 'rank', value: inductee?.rank || '', required: true, maxLength: 100 },
    { type: 'text', text: 'Unit: ', id: 'unit', value: inductee?.unit || '', required: true, maxLength: 100 },
    { type: 'text', text: 'Place: ', id: 'place', value: inductee?.place || '', required: false, maxLength: 100 },
    { type: 'text', text: 'Date: ', id: 'date', value: inductee?.date || '', required: false, maxLength: 100 },
    { type: 'text', text: 'Citation: ', id: 'citation', value: inductee?.citation || '', required: true, maxLength: 5000 },
    { type: 'text', text: 'Category: ', id: 'category', value: inductee?.category || '', required: false, maxLength: 100 }
  ];

  const handleFieldChange = (fieldName) => (e) => {
    setInductee(prev => {
      const updatedInductee = Object.create(Object.getPrototypeOf(prev));
      Object.assign(updatedInductee, prev);
      updatedInductee.updateField(fieldName, e.target.value);
      return updatedInductee;
    });
  };

  return (
    <div>
      {loading ?
      <LoadingScreen />
      :
      <div>
        <Form onSubmit={updateDatabase}>
          {fields.map(field => (
            <FormField
              key={field.id}
              type={field.type}
              text={field.text}
              id={field.id}
              value={field.value}
              checked={field.checked}
              onChange={() => handleFieldChange(field.id)} 
              required={field.required}
              disabled={loading}
              maxLength={field.maxLength}
            />
          ))}
  
          <GeneralButton
            type="submit"
            disabled={loading}
            text='Update'
          />
        </Form>
      </div>
      }
    </div>
  );  
}

export default AdminInductee;
