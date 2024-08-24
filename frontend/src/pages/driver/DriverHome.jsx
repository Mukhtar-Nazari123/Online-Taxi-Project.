import React, {useState} from 'react'
import "./driver.css"
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";
import { LuLogOut } from "react-icons/lu";
import { LuClipboardEdit } from "react-icons/lu";
import { GrContactInfo } from "react-icons/gr";
import MapSection from '../../components/MapSection';
import DriverProfiles from './DriverProfiles';

function DriverHome(Toggle) {
    const [showInfo, setShowInfo] = useState(false);

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
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
                        <div className='d-flex gap-2' onClick={handleInfoClick}>
                        <IconContext.Provider value={{size: '20px',color: 'dark' , className: "global-class-name" }}>
                            <GrContactInfo />
                        </IconContext.Provider>
                        <h6>Info</h6>
                        </div>
                    </a></li>
                    <li><a className="dropdown-item" href={"#1"}>
                        <div className='d-flex gap-2'>
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
        {showInfo && <DriverProfiles />}
        <div className='px-3'>
            <MapSection/>
        </div>
    </div>
  )
}

export default DriverHome