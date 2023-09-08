import React from 'react';
import MyBreadcrumbs from '../../../Config/MyBreadcrumbs';
import { useTranslation } from "react-i18next";
const WorkerReportsBreadcrumbs = () => {
  const { t, i18n } = useTranslation();
  const breadcrumbItems = [
    { text: 'Home', url: '/home' },
    { text: t("Reports"), url: '/WorkerReports' },
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

export default WorkerReportsBreadcrumbs;
