import React, { useState } from 'react';
import axios from 'axios';

function EditDriverDoc({ onClose, driverId}) {
  const [files, setFiles] = useState({
    your_photo: null,
    id_card_photo: null,
    license_photo: null,
  });
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    if (files && files[0]) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [id]: files[0],
      }));
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const formData = new FormData();
    if (files.your_photo) {
      formData.append('your_photo', files.your_photo);
    }
    if (files.id_card_photo) {
      formData.append('id_card_photo', files.id_card_photo);
    }
    if (files.license_photo) {
      formData.append('license_photo', files.license_photo);
    }
    if (address) {
      formData.append('address', address);
    }

    try {
      const response = await axios.post(`/api/admin/drivers/${driverId}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage(response.data.message);
      // Reset form state after successful submission
      setTimeout(() => {
        onClose();
      }, 3000);

      setFiles({
        your_photo: null,
        id_card_photo: null,
        license_photo: null,
      });
      setAddress('');
    } catch (error) {
      let errorMsg = 'An unexpected error occurred.';
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        errorMsg = Object.values(errors).flat().join(', ');
      }
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className='col-10 mt-3'>
        <form className="row g-3" onSubmit={handleSubmit}>
          <p className='fs-3 fw-bold'>Edit Documents</p>
          <div className="col-md-6">
            <label htmlFor="your_photo" className="form-label">Your Photo</label>
            <input type="file" accept="image/*" className="form-control" id="your_photo" onChange={handleFileChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="id_card_photo" className="form-label">ID Card Front</label>
            <input type="file" accept="image/*" className="form-control" id="id_card_photo" onChange={handleFileChange}/>
          </div>
          <div className="col-12">
            <label htmlFor="license_photo" className="form-label">Driving License</label>
            <input type="file" accept="image/*" className="form-control" id="license_photo" onChange={handleFileChange}/>
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="address..." value={address} onChange={handleAddressChange} />
          </div>
          <div className="col-12">
            <input type="submit" value={loading ? 'Saving...' : 'Save'} className="bg-primary form-control mt-2" disabled={loading} />
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
        </form>
      </div>
    </div>
  );
}

export default EditDriverDoc;