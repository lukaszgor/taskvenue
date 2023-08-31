import React from 'react';
import MyBreadcrumbs from '../../Config/MyBreadcrumbs';
import { useTranslation } from "react-i18next";
const ManagerAbsenceBreadcrumbs = () => {
  const { t, i18n } = useTranslation();
  const breadcrumbItems = [
    { text: 'Home', url: '/home' },
    { text: t("Absences"), url: '/Absences' },
    { text: t("Absence") },
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

export default ManagerAbsenceBreadcrumbs;
