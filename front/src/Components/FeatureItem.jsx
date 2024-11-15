import React from 'react';

const FeatureItem = ({ feature, isSelected, onToggle, quantity }) => {
  const handleQuantityChange = (action) => {
    onToggle({
      currentTarget: {
        name: 'quantity',
        value: { featureId: feature.id, action },
      },
    });
  };
  
  const isQuantityFeature = feature.hasQuantity;

  return (
    <div className="mb-2 flex items-center">
      <span className="flex-1 text-[#383737]">{feature.name}</span>
      {isQuantityFeature ? (
        <div className="flex items-center ml-4">
          <button
            type="button"
            className="cursor-pointer mr-1"
            onClick={()=>handleQuantityChange('decrease')}
            disabled={quantity === 0}
          >
            <img src="/Icons/minus-circle.svg" alt="decrese" />
          </button>
          <span className="mx-2 text-xl text-[#383737]">{quantity}</span>
          <button
            type="button"
            className="cursor-pointer ml-1"
            onClick={()=>handleQuantityChange('increase')}
          >
            <img src="/Icons/plus-circle.svg" alt="increse" />
          </button>
        </div>
      ) : isSelected ? (
        <>
          <button
            type="button"
            className="cursor-pointer"
            onClick={(e)=>onToggle(e)}
            value={feature.id}
            name="selectedFeatures"
          >
            <img src="/Icons/check-color.svg" alt="Seleccionar característica" className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="cursor-pointer ml-2"
            onClick={(e)=>onToggle(e)}
            value={feature.id}
            name="selectedFeatures"
          >
            <img src="/Icons/cancel-gray.svg" alt="Cancelar selección" />
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="cursor-pointer"
            onClick={(e)=>onToggle(e)}
            value={feature.id}
            name="selectedFeatures"
          >
            <img src="/Icons/check-gray.svg" alt="Desmarcar característica" />
          </button>
          <button
            type="button"
            className="cursor-pointer ml-2"
            onClick={(e)=>onToggle(e)}
            value={feature.id}
            name="selectedFeatures"
          >
            <img src="/Icons/cancel-color.svg" alt="Activar selección" />
          </button>
        </>
      )}
    </div>
  );
};

export default FeatureItem;
