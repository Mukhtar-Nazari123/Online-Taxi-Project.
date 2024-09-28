import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";
import AdminProfile from './AdminProfile';

function Nav({ Toggle }) {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent position-sticky ">
      <i className="navbar-brand bi bi-justify-left fs-2 text-primary" onClick={Toggle}></i>
      <button
        className="navbar-toggler"
        style={{ position: 'relative', zIndex: 1000 }}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className='bi bi-justify'></i>
      </button>
        <div className="text-center" style={{ width: '100%' }}>
          <h1 
          style={{ 
            margin: '0 auto', 
            color: '#00BFFF',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)',
            letterSpacing: '2px',
            cursor: 'pointer'
           }}
          >Admin Dashboard</h1>
        </div>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="1#"
              id="dropdownId"
              role="button"
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                toggleProfile();
              }}
              aria-haspopup="true"
              aria-expanded={showProfile}
            >
              <IconContext.Provider
                value={{
                  size: "35px",
                  color: "white",
                  className: "global-class-name",
                }}
              >
                <CgProfile style={{ cursor: "pointer" }} />
              </IconContext.Provider>
            </a>
            {showProfile && <AdminProfile onClose={toggleProfile} />}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;