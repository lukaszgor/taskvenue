import React from 'react';
import ManagerNavBar from '../NavigationBar/ManagerNavBar';
import StatusOfImplementation30Report from '../Reports/StatusOfImplementation30Report';
import YourOpenAndInProgressTasksReport from '../Reports/YourOpenAndInProgressTasksReport';


const MainView = () => {

  return (
    <div>
        <ManagerNavBar></ManagerNavBar>
        <p></p>
<StatusOfImplementation30Report></StatusOfImplementation30Report>
<YourOpenAndInProgressTasksReport></YourOpenAndInProgressTasksReport>
  </div>
  );
};

export default MainView;
