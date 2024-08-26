import React, {useState} from 'react'
import "./driver.css"
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";
import { LuLogOut } from "react-icons/lu";
import { LuClipboardEdit } from "react-icons/lu";
import { FaCar } from "react-icons/fa";
import MapSection from '../../components/MapSection';
import DriverProfiles from './DriverProfiles';
import CarInfo from './CarInfo';

function DriverHome(Toggle) {
    const [showEditInfo, setEditInfo] = useState(false);
    const [showCarInfo, setshowCarInfo] = useState(false);


  const handleEditInfoClick = () => {
    setEditInfo(!showEditInfo);
  };

  const handleCarInfoClick = () => {
    setshowCarInfo(!showCarInfo);
  };

  return (
    <div>
        <nav className="navbar navbar-light bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand text-white fs-3"  href={"1"}>Drive</a>
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
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarScrollingDropdown">
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
                    <div className='d-flex gap-2'>
                        <IconContext.Provider value={{size: '20px',color: 'dark' , className: "global-class-name" }}>
                             <LuLogOut />
                        </IconContext.Provider>
                        <h6>Log Out</h6>     
                    </div>
                    </a></li>
                </ul>
                </li>
            </div>
        </nav>
        {showEditInfo && <DriverProfiles />}
        {showCarInfo && <CarInfo />}
        <div className='px-3'>
            <MapSection/>
        </div>
    </div>
  )
}

export default DriverHome