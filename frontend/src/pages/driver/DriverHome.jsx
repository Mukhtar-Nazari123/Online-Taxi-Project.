import React, {useState, useEffect} from 'react'
import "./driver.css"
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";
import { LuLogOut } from "react-icons/lu";
import { LuClipboardEdit } from "react-icons/lu";
import { FaCar } from "react-icons/fa";
import DriverProfiles from './DriverProfiles';
import CarInfo from './CarInfo';
import Pusher from 'pusher-js';
import RideInfo from './RideInfo';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import DriverMap from './DriverMap';
import {Link} from "react-router-dom";
import { IoMdHome } from "react-icons/io";

function DriverHome(Toggle) {
    const [showEditInfo, setEditInfo] = useState(false);
    const [showCarInfo, setshowCarInfo] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [rideInfo, setRideInfo] = useState({});
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(true);


    const originLat = rideInfo.origin_latitude;
    const originLon = rideInfo.origin_longitude;
    const destinationLat = rideInfo.destination_latitude;
    const destinationLon = rideInfo.destination_longitude;

    console.log('idddd', rideInfo.id)
    console.log('originLon', destinationLon)

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('9a70a9abd2a13265d9c3', {
            cluster: 'ap1',
        });

        const channel = pusher.subscribe('drivers-channel');

        // Bind to the event
        channel.bind('RideAssigned', (data) => {
            const ride = data.ride;
            console.log('Event received:', ride);
            setRideInfo(data.ride);
            localStorage.setItem('trip_id', data.ride.id);
            setIsDisabled(false);
            setShowModal(true);
        });

        // Cleanup on component unmount
        return () => {
            pusher.unsubscribe('my-channel');
        };
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        navigate('/');
        swal("Success","Logged Out Successfully!", "success");
      };


  const handleEditInfoClick = () => {
    setEditInfo(!showEditInfo);
  };

  const handleCarInfoClick = () => {
    setshowCarInfo(!showCarInfo);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div>
        <nav className="navbar navbar-light bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand h1 d-flex align-item-center">
                    <Link to="/" className="text-decoration-none">
                        <IoMdHome className="fs-1 homeIconU"/>
                    </Link>
                </span>
                <ul className="navbar-nav justify-content flex-grow-1 pe-3">
                <li className="nav-item text-light fs-3">
                    Online Taxi
                </li>
                </ul>
                <li className="nav-item dropdown">
                <a className="profile nav-link dropdown-toggle text-white" href={"1"}id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <IconContext.Provider
                    value={{
                    size: "35px",
                    color: "white",
                    className: "global-class-name ",
                    }}
                >
                    <CgProfile style={{ cursor: "pointer" }}/>
                </IconContext.Provider>
                </a>
                <ul className="dropdown-menu dropdown-menu-end" 
                aria-labelledby="navbarScrollingDropdown"
                style={{zIndex: '10000'}}
                >
                    <li><a className="dropdown-item" href={"#1"}>
                        <div className='d-flex gap-2' onClick={handleCarInfoClick}>
                        <IconContext.Provider value={{size: '20px',color: 'dark' , className: "global-class-name" }}>
                            <FaCar />
                        </IconContext.Provider>
                        <h6>Car Info</h6>
                        </div>
                    </a></li>
                    <li><a className="dropdown-item" href={"#1"}>
                        <div className='d-flex gap-2' onClick={handleEditInfoClick}>
                        <IconContext.Provider value={{size: '20px',color: 'dark' , className: "global-class-name" }}>
                             <LuClipboardEdit />
                        </IconContext.Provider>
                        <h6>Edit Info</h6>
                        </div>
                    </a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href={"#1"}>
                    <div className='d-flex gap-2' onClick={handleLogout}>
                        <IconContext.Provider  value={{size: '20px',color: 'dark' , className: "global-class-name" }}>
                             <LuLogOut />
                        </IconContext.Provider>
                        <h6>Log Out</h6>     
                    </div>
                    </a></li>
                </ul>
                </li>
            </div>
        </nav>
        <RideInfo show={showModal} handleClose={handleClose} ride={rideInfo} />
        {showEditInfo && <DriverProfiles />}
        {showCarInfo && <CarInfo />}
        <div className='px-3'>
            <DriverMap
            destinationCoords={{ lat: originLat, lon: originLon }}
            destinationCoords1={{ lat: destinationLat, lon: destinationLon }}
            isDisabled={isDisabled}

            />
        </div>
    </div>
  )
}

export default DriverHome