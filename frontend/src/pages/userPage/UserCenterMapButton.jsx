import React from 'react';
import "./userCenterMapButton.css"
import { FaLocationArrow } from 'react-icons/fa';

const UserCenterMapButton = ({ onCenterMap }) => {
    return (
        <div className="center-map-button" onClick={onCenterMap}>
          <FaLocationArrow />
        </div>
      );
};

export default UserCenterMapButton;