import React from 'react';
import ClientNavBar from '../../Components/NavigationBar/ClientNavBar';
import PasswordChange from '../../Components/Common/PasswordChange';

const ClientProfile = () => {
    return (
        <div>
             <ClientNavBar></ClientNavBar>
         <PasswordChange></PasswordChange>
      </div>
      );
};

export default ClientProfile;