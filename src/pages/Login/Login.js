import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import Form from '../../components/Form/Form';
import FormField from '../../components/Form/FormField';
import LoginDTO from '../../dtos/loginDTO/loginDTO';

//FUTURE: Only allow certain number of attemps for login
function Login() {
  const [loginData, setLoginData] = useState(new LoginDTO())
  const [processing, setProcessing] = useState(false);
  
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const success = await login(loginData);
    if (success) {
      //TODO: Navigate Admin Page using navigate
    }
    setProcessing(false);
  };

  const fields = [
    { type: "text", text: "Username: ", id: "username", value: loginData.username },
    { type: "password", text: "Password: ", id: "password", value: loginData.password }
  ]

  const handleFieldChange = (fieldName) => (e) => {
    setLoginData(prev => {
      const updatedLoginData = Object.create(Object.getPrototypeOf(prev));
      Object.assign(updatedLoginData, prev);
      updatedLoginData.updateField(fieldName, e.target.value);
      return updatedLoginData;
    });
  };

  return (
    <div>
        <header>
            Admin Login
        </header>

        <Form onSubmit={handleSubmit}>
          {fields.map(field => (
            <FormField
              key={field.id}
              type={field.type}
              text={field.text}
              id={field.id}
              value={field.value}
              onChange={handleFieldChange(field.id)}
              disabled={processing}
              maxLength={100}
            />
          ))}

          <GeneralButton
            type="submit"
            text="Login"
            disabled={processing}
          />
        </Form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;