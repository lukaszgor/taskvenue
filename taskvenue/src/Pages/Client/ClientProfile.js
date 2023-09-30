import React from 'react';
import ClientNavBar from '../../Components/NavigationBar/ClientNavBar';
import PasswordChange from '../../Components/Common/PasswordChange';
import ClientProfileBreadcrumbs from '../../Components/Breadcrumbs/Client/ClientProfileBreadcrumbs';

const ClientProfile = () => {
    return (
        <div>
             <ClientNavBar></ClientNavBar>
             <ClientProfileBreadcrumbs></ClientProfileBreadcrumbs>
         <PasswordChange></PasswordChange>
      </div>
      );
};

export default ClientProfile;