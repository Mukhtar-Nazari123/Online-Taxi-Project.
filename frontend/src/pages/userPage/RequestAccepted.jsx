import React from 'react';
import './requestAccepted.css';

const RequestAccepted = ({ show, handleClose, driverInfo }) => {
    if (!show) return null;
    console.log('driver info',driverInfo.name)

    return (
        <div className="custom-alert1 col-lg-4 col-sm-6">
            <div className="close-Btnn" onClick={handleClose}>
                &times;
            </div>
            <div className="alert-content1 ml-2">
                <h4 className='header1'>Request Accepted!</h4>
                <div><span className='fs-5 fw-bold me-2'>Name:</span> <span>{driverInfo.name}</span></div>
                <div><span className='fs-5 fw-bold me-2'>Phone:</span> <span>{driverInfo.phone}</span></div>
                <div><span className='fs-5 fw-bold me-2'>Car:</span> <span>{driverInfo.car.model} {driverInfo.car.year}</span></div>
                <div><span className='fs-5 fw-bold me-2'>Plate Number:</span> <span>{driverInfo.car.plate}</span></div>
                <button className="btn btn-primary ok-btn1" onClick={handleClose} >Ok</button>
            </div>
        </div>
    );
};

export default RequestAccepted;