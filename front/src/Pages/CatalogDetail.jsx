import React, { useEffect, useState } from 'react';
import Catalog from '../Components/Catalog';
import { useParams } from 'react-router-dom';
import { rustikEndpoints } from '../services/rustkEndPoints';
import { rustikApi } from '../services/rustikApi';

const CatalogDetail = () => {
    
    const params = useParams();
    const { id } = params;
    const [cabin, setCabin] = useState({});

    useEffect(() => {
        const apicall = async () => {
          try {
            const { data } = await rustikApi.get(`${rustikEndpoints.cabins}/${id}`);
            setCabin(data);
          } catch (error) {
            console.error("Error al llamar a la api", error);
          }
        };
        apicall();
      }, []);

    
    return (
        cabin.name && <Catalog cabin={cabin}  />
    );
};

export default CatalogDetail;
