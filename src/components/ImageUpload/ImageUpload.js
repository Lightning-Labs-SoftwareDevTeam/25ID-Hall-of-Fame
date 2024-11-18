import React from 'react';
import styles1 from './ImageUpload.module.css';
import styles2 from '../GeneralButton/GeneralButton.module.css';


const ImageUpload = ({ id, title, onChange, disabled = false, multiple = false }) => (
  <div>
    <label 
        style={{ 
          margin: 5, 
          backgroundColor: disabled ? '#cccccc' : '',
          color: disabled ? '#666666' : '',
          cursor: disabled ? 'not-allowed' : 'pointer' 
        }}
        htmlFor={id} 
        className={styles2.generalButton}
        disabled={disabled}
    >
      {title}
    </label>
    <input
        className={styles1.imageUploadInput}
        type="file"
        id={id}
        onChange={onChange}
        accept="image/*" 
        disabled={disabled} 
        multiple={multiple}
    />
  </div>
);

export default ImageUpload;