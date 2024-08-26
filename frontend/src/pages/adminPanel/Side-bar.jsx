import React from 'react'
import "./sideBar.css"
import 'bootstrap-icons/font/bootstrap-icons.css';

function Sidebar({AdminHomeComponent, PassengerComponent, DriverComponent,CarComponent, TripComponent}) {
  return (
        <div className='bg-white sidebar p-1'>
         <div className='text-center'>
         <div>
           <i class="bi bi-car-front carIcon"></i>
         </div>
         <div>
           <span className='brand-name fs-1 OnlineTaxi '>OnlineTaxi</span>
         </div>
        </div>
        <hr className='text-dark'/>
        <div className='list-group list-group-flush'>
            <a className='list-group-item py-2' href="#1">
                <i className='bi bi-speedometer2 fs-4 me-2'></i>
                <span>Dashboard</span>
            </a>
            <a className='list-group-item py-2' onClick={AdminHomeComponent} href="#1">
                <i className='bi bi-house fs-4 me-2'></i>
                <span>Home</span>
            </a>
            <a className='list-group-item py-2 ' onClick={PassengerComponent} href="#1">
                <i className='bi bi-people fs-4 me-2'></i>
                <span>Passengers</span>
            </a>
            <a className='list-group-item py-2' onClick={DriverComponent} href="#1">
                <i className="bi bi-person fs-4 me-2"></i>
                <span>Drivers</span>
            </a>
            <a className='list-group-item py-2' onClick={CarComponent} href="#1">
                <i className="bi bi-person fs-4 me-2"></i>
                <span>Cars</span>
            </a>
            <a className='list-group-item py-2' onClick={TripComponent} href="#1">
                <i className="bi bi-map fs-4 me-2"></i>
                <span>Trips</span>
            </a>
            <a className='list-group-item py-2' href="#1">
                <i className='bi bi-power fs-4 me-2'></i>
                <span>Loguot</span>
            </a>
        </div>

    </div>
   
  )
}

export default Sidebar