import React from 'react'
import { FaPhoneSquare, FaHome, FaMapMarkedAlt, FaCar } from "react-icons/fa";
import { FaSquareFacebook, FaSquareWhatsapp } from 'react-icons/fa6'
import { MdAttachEmail } from 'react-icons/md'
import { IconContext } from "react-icons";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { Link } from 'react-router-dom';

function Footer1() {
  return (
    <footer class="footer-07 bg-dark">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-md-12 text-center">
						<h2 class="footer-heading"><a href={"#1"} class="text-decoration-none">Online Taxi</a></h2>
						<div className='d-flex justify-content-center gap-3 m-3'>
							<a className='text-decoration-none' href={"#1"}>
                                <div className='d-flex gap-2'>
                                    <IconContext.Provider value={{size: '25px',color: 'white', className: "global-class-name" }}>
                                       <FaHome />
                                    </IconContext.Provider>
                                    <h5>Home</h5>
                                </div>
                            </a>
							<a className='text-decoration-none' href={"#1"}>
                                <div className='d-flex gap-2'>
                                    <IconContext.Provider value={{size: '25px', color: 'white', className: "global-class-name" }}>
                                        <FaMapMarkedAlt/>
                                    </IconContext.Provider>
                                    <h5>Ride</h5>
                                </div>
                            </a>
                            <a className='text-decoration-none' href={"#1"}>
                                <div className='d-flex gap-2'>
                                    <IconContext.Provider value={{size: '25px', color: 'white', className: "global-class-name" }}>
                                        <FaCar />
                                    </IconContext.Provider>
                                    <h5>Drive</h5>
                                </div>
                            </a>
                            <Link className='text-decoration-none' to="/login">
                                <div className='d-flex gap-2'>
                                    <IconContext.Provider value={{size: '25px', color: 'white', className: "global-class-name" }}>
                                        <LuLogIn />
                                    </IconContext.Provider>
                                    <h5>Sign in</h5>
                                </div>
                            </Link>	
                            <Link className='text-decoration-none' to="/register">
                                <div className='d-flex gap-2'>
                                    <IconContext.Provider value={{size: '25px',color: 'white' , className: "global-class-name" }}>
                                        <LuLogOut />
                                    </IconContext.Provider>
                                    <h5>Sign up</h5>
                                </div>
                            </Link>	
                        </div>
			<ul class="list-group list-group-horizontal d-flex justify-content-center gap-2">
            <li className='list-group-item rounded'>
                <a href={"#1"} data-toggle="tooltip" data-placement="top" title="Whats App">
                    <IconContext.Provider value={{size: '40px', color:"green", className: "global-class-name" }}>
                      <FaPhoneSquare />
                    </IconContext.Provider>
                </a>
              </li> 
              <li className='list-group-item rounded'>
                <a href={"#1"} data-toggle="tooltip" data-placement="top" title="Whats App">
                    <IconContext.Provider value={{size: '40px', color:"green", className: "global-class-name" }}>
                       <FaSquareWhatsapp/>
                    </IconContext.Provider>
                </a>
              </li> 
              <li className='list-group-item rounded'>
                <a href={"#1"} data-toggle="tooltip" data-placement="top" title="Instagram">
                   <IconContext.Provider value={{size: '40px', color:"red", className: "global-class-name" }}>
                     <MdAttachEmail/>
                  </IconContext.Provider>
                </a>
              </li>
              <li className='list-group-item rounded'>
                <a href={"#1"} data-toggle="tooltip" data-placement="top" title="Facebook">
                   <IconContext.Provider value={{size: '40px', color:"blue", className: "global-class-name" }}>
                     <FaSquareFacebook/>
                   </IconContext.Provider>
                </a>
              </li>
            </ul>
					</div>
				</div>
				<div class="row mt-5">
					<div class="col-md-12 text-center">
						<p class="copyright text-white">
					  Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="ion-ios-heart" aria-hidden="true"></i> by <a className='text-decoration-none' href={"#1"}>Online Taxi</a>
					</p>
					</div>
				</div>
			</div>
		</footer>
  )
}

export default Footer1