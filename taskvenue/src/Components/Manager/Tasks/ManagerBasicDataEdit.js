import React from 'react';
import { useParams } from "react-router-dom";


const ManagerBasicDataEdit = () => {
    const {id} = useParams()
    return (
        <div>
<p>Basic data {id}</p>
      </div>
      );
};

export default ManagerBasicDataEdit;