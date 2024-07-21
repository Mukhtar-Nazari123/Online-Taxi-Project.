import React from 'react'
import SearchBar from './SearchBar'


function Drivers() {
    const driverInfo = {
        name: ' John Doe',
        phoneNumber: ' 0772776812',
        licenseNumber: ' 12345ABC',
        rating: ' 4.5',
    }
    
  return (
    <div>
      <SearchBar/>
    <div className='row'>
        <div className="card col-sm-6 col-md-4 col-lg-3 p-1">
           <img src={"wp1898150.jpg"} className="card-img-top rounded" alt={"#1"}/>
         <div className="card-body">
            <div className="card-title">
              <label>Name:</label>
              <span>{driverInfo.name}</span>
            </div>
         </div>
         <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <label>Phone Number:</label>
              <span>{driverInfo.phoneNumber}</span>
            </li>
            <li className="list-group-item">
              <label>License Number:</label>
              <span>{driverInfo.licenseNumber}</span>
            </li>
            <li className="list-group-item">
              <label>Rating:</label>
              <span>{driverInfo.rating}</span>
            </li>
          </ul>
        </div>
        <div className="card col-sm-6 col-md-4 col-lg-3 p-1">
           <img src={"wp1898150.jpg"} className="card-img-top rounded" alt={"#1"}/>
         <div className="card-body">
            <div className="card-title">
              <label>Name:</label>
              <span>{driverInfo.name}</span>
            </div>
         </div>
         <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <label>Phone Number:</label>
              <span>{driverInfo.phoneNumber}</span>
            </li>
            <li className="list-group-item">
              <label>License Number:</label>
              <span>{driverInfo.licenseNumber}</span>
            </li>
            <li className="list-group-item">
              <label>Rating:</label>
              <span>{driverInfo.rating}</span>
            </li>
          </ul>
        </div>
        <div className="card col-sm-6 col-md-4 col-lg-3 p-1">
           <img src={"wp1898150.jpg"} className="card-img-top rounded" alt={"#1"}/>
         <div className="card-body">
            <div className="card-title">
              <label>Name:</label>
              <span>{driverInfo.name}</span>
            </div>
         </div>
         <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <label>Phone Number:</label>
              <span>{driverInfo.phoneNumber}</span>
            </li>
            <li className="list-group-item">
              <label>License Number:</label>
              <span>{driverInfo.licenseNumber}</span>
            </li>
            <li className="list-group-item">
              <label>Rating:</label>
              <span>{driverInfo.rating}</span>
            </li>
          </ul>
        </div>
        <div className="card col-sm-6 col-md-4 col-lg-3 p-1">
           <img src={"wp1898150.jpg"} className="card-img-top rounded" alt={"#1"}/>
         <div className="card-body">
            <div className="card-title">
              <label>Name:</label>
              <span>{driverInfo.name}</span>
            </div>
         </div>
         <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <label>Phone Number:</label>
              <span>{driverInfo.phoneNumber}</span>
            </li>
            <li className="list-group-item">
              <label>License Number:</label>
              <span>{driverInfo.licenseNumber}</span>
            </li>
            <li className="list-group-item">
              <label>Rating:</label>
              <span>{driverInfo.rating}</span>
            </li>
          </ul>
        </div>
    </div>
    </div>
  )
}

export default Drivers