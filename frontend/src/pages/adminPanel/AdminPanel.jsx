import React from 'react'
import './adminPanel.css'
import Sidebar from './Side-bar'
import { useState } from 'react'
import Passengers from './Passengers'
import Nav from './Nav'
import AdminHome from './AdminHome'
import Drivers from './Drivers'
import Trips from './Trips'
import ShowCarInfo from './ShowCarInfo'


function AdminPanel() {
  const [toggle, setToggle] = useState(true)
  const Toggle = () => {
    setToggle(!toggle)
  }

  const [openOptions, SetOpenOptions] = useState("adminHome");
  const AdminHomeComponent = () => {
    SetOpenOptions("adminHome");
  }
  const PassengerComponent = () => {
    SetOpenOptions("passengerComponent");
  }
  const DriverComponent = () => {
    SetOpenOptions("driverComponent");
  }
  const CarComponent = () => {
    SetOpenOptions("carComponent");
  }
  const TripComponent = () => {
    SetOpenOptions("tripComponent");
  }

  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row'>
        { toggle && <div className='col-4 col-lg-3 col-xl-2 bg-white vh-100 position-fixed'>
        <Sidebar 
        AdminHomeComponent = {AdminHomeComponent} 
        PassengerComponent = {PassengerComponent}
        DriverComponent = {DriverComponent}
        CarComponent = {CarComponent}
        TripComponent = {TripComponent}
        />
        </div> }
        {toggle && <div className='col-4 col-lg-3 col-xl-2'></div> }
        <div className='col vh-auto px-3'>
          <Nav Toggle = {Toggle}/>
          {openOptions === "adminHome" && (
            <div>
              <AdminHome/>
            </div>
          ) }
          {openOptions === "passengerComponent" && (
            <div>
              <Passengers/>
            </div>
          )}
          {openOptions === "driverComponent" && (
            <div>
              <Drivers/>
          </div>
          )}
          {openOptions === "carComponent" && (
            <div>
              <ShowCarInfo/>
          </div>
          )}
          {openOptions === "tripComponent" && (
            <div>
              <Trips/>
          </div>
          )}
        </div>
        
      </div>  
    </div>
  )
}

export default AdminPanel