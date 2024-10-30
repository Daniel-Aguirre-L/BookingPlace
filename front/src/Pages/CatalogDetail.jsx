import React from 'react';
import Catalog from '../Components/Catalog';

const CatalogDetail = () => {
    const cabin = {
        id: 1,
        images: [
            "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1399&q=80",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
            "https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&auto=format&fit=crop&w=765&q=80",
        ],
        comments: 23,
    };

    return (
        <Catalog cabin={cabin} />
    );
};

export default CatalogDetail;
