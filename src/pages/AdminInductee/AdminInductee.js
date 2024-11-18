import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toastRef } from '../../context/toastContext/toastContext';
import { useAuth } from '../../context/authContext';
import inducteeService from '../../services/inducteeService';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import Form from '../../components/Form/Form';
import FormField from '../../components/Form/FormField';
import Header from '../../components/Header/Header';
import InducteeDTO from '../../dtos/inducteeDTO/inducteeDTO';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import { blobToImageString, imageStringToBlob } from '../../utils/processImage';


function AdminInductee() {
  const [inductee, setInductee] = useState(null);
  const [isAddition, setIsAddition] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
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

    const loadInductee = async () => {
      let inducteeDTO = null;
      try {
        const updatedInductee = location.state.inductee;
        inducteeDTO = InducteeDTO.fromData(updatedInductee);
        setInductee(inducteeDTO);
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
        navigate('/admin/home');
      }

      if (inducteeDTO.image) {
        try {
          const blob = await imageStringToBlob(inducteeDTO.image);
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        } catch (error) {
          console.error(`Error loading image: ${error}`)
        }
      }

      if (location.state.addition) { setIsAddition(location.state.addition) }
      setLoading(false);
    }

    loadInductee();
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

  const handleImageChange = async (event) => {
    setLoading(true);
    try {
        const file = event.target.files[0];
        const imageString = await blobToImageString(file);
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
        setInductee(prev => {
          const updatedInductee = Object.create(Object.getPrototypeOf(prev));
          Object.assign(updatedInductee, prev);
          updatedInductee.image = imageString;
          return updatedInductee;
        });
    } catch {
        console.log('Error uploading image');
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
    { type: 'text', text: 'Category: ', id: 'category', value: inductee?.category || '', required: false, maxLength: 100 },
    { type: 'multiline', text: 'Citation: ', id: 'citation', value: inductee?.citation || '', required: true, maxLength: 5000 }
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
    <>
      {loading ?
      <LoadingScreen />
      :
      <div className='App'>
        <Header text={isAddition ? "Add Inductee" : "Update Inductee"}/>
        <Form onSubmit={updateDatabase}>
          {fields.map(field => (
            <FormField
              key={field.id}
              type={field.type}
              text={field.text}
              id={field.id}
              value={field.value}
              checked={field.checked}
              onChange={handleFieldChange(field.id)} 
              required={field.required}
              disabled={loading}
              maxLength={field.maxLength}
            />
          ))}

          <ImageUpload
            id="image-upload"
            title="Upload Image"
            onChange={handleImageChange}
          />

  
          <GeneralButton
            type="submit"
            disabled={loading}
            text={isAddition ? 'Add' : 'Update'}
          />

          { imageUrl &&
            <div style={{ justifyContent: 'center' }}>
                <img src={imageUrl} alt="Image" style={{ width: '70%', height: 'auto', margin: '20px' }} />
            </div>
          }
        </Form>
      </div>
      }
    </>
  );  
}

export default AdminInductee;
