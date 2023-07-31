import React from 'react';
import { useState,useEffect } from 'react';
import FetchSupabaseData from './FetchSupabaseData';
import { useNavigate } from "react-router-dom";

const IdConfigurationGuard = () => {
    const navigate = useNavigate();
    const [receivedData, setReceivedData] = useState({ userId: '', idConfiguration: '', profileType: '' });
    const handleGetData = (userId, idConfiguration, profileType) => {
        setReceivedData({ userId, idConfiguration, profileType });
      };
      useEffect(() => {
        if (receivedData.idConfiguration ===null) {
            navigate('/WaitingRoomForNewUser')
        }
      }, [receivedData.idConfiguration]);
  
  return (
    <div>
     <FetchSupabaseData sendData={handleGetData}></FetchSupabaseData>
    </div>
  );
};

export default IdConfigurationGuard;