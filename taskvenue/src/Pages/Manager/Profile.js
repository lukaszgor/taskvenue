import React from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import PasswordChange from '../../Components/Common/PasswordChange';
import ManagerProfileBreadcrumbs from '../../Components/Breadcrumbs/mainBreadcrumbs/ManagerProfileBreadcrumbs';

const Profile = () => {
    return (
        <div>
            <ManagerNavBar></ManagerNavBar>
            <ManagerProfileBreadcrumbs></ManagerProfileBreadcrumbs>
         <PasswordChange></PasswordChange>

      
      </div>
      );
};

export default Profile;