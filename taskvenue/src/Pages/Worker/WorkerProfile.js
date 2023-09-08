import React from 'react';
import WorkerNavBar from '../../Components/NavigationBar/WorkerNavBar';
import PasswordChange from '../../Components/Common/PasswordChange';
import WorkerProfileBreadcrumbs from '../../Components/Breadcrumbs/Worker/WorkerProfileBreadcrumbs';

const WorkerProfile = () => {
    return (
        <div>
             <WorkerNavBar></WorkerNavBar>
             <WorkerProfileBreadcrumbs></WorkerProfileBreadcrumbs>
         <PasswordChange></PasswordChange>
      </div>
      );
};

export default WorkerProfile;