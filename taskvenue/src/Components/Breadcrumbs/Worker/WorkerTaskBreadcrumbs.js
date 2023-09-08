import React from 'react';
import MyBreadcrumbs from '../../Config/MyBreadcrumbs';
import { useTranslation } from "react-i18next";
const WorkerTaskBreadcrumbs = () => {
  const { t, i18n } = useTranslation();
  const breadcrumbItems = [
    { text: 'Home', url: '/home' },
    { text: t("Tasks"), url: '/WorkerTask' },
    { text: t("Task") },
  ];

  return (
    <div>
      <p></p>
      <div style={{ marginLeft: '20px', marginTop: '10px' }}>
      <MyBreadcrumbs items={breadcrumbItems} />
    </div>
    </div>
  );
};

export default WorkerTaskBreadcrumbs;
