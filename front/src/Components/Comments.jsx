import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CloseButton from './CloseButton';
import { rustikEndpoints } from '../services/rustkEndPoints';
import { rustikApiForm } from "../services/rustikApi";
import useNotificationStore from '../store/useNotificationStore';

const Comments = ({ isModalOpen, setIsModalOpen }) => {
  const { setNotification } = useNotificationStore();
  const { id } = useParams();
  const [errors, setErrors] = useState({ rating: '', review: '' });
  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: '',
    }));
  };

  const handleSubmit = async () => {
    const { rating, review } = formData;
    let validationErrors = {};

    if (rating === 0) {
      validationErrors.rating = 'Por favor selecciona una calificación.';
    }

    if (review.trim() === '') {
      validationErrors.review = 'Por favor escribe tu reseña.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const dataToSend = { 
        "score": formData.rating,
        "review": formData.review
      };

      const response = await rustikApiForm.post(`${rustikEndpoints.raiting}/${id}`, dataToSend);
      if (response.status === 200 || response.status === 201) {
        setIsModalOpen(false);
        setNotification({
          visibility: true,
          type: "success",
          text: "¡Gracias por tu calificación!", 
        });
        setFormData({
          rating: 0,
          review: '',
        });
        setErrors({});
      } else {
        alert('Hubo un problema al enviar tu reseña. Inténtalo más tarde.');
      }
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
    }
  };


  return(
    <>
      {isModalOpen && (
        <div className="animate-fadeIn hs-overlay fixed top-0 left-0 w-full h-full d-flex my-0 mx-auto bg-black bg-opacity-50 py-8 z-50 backdrop-blur">
          <div className=" my-10 mx-auto flex flex-col md:w-601 bg-[#EEE] border shadow-sm rounded-xl pointer-events-auto h-[72vh] overflow-auto">
            <div className="sticky top-0 flex justify-between items-center py-3 px-4 border-b bg-[#088395]  rounded-t-xl">
              <h3 className="font-bold text-[#EEEEEEEE]">Deja tu Reseña</h3>
              <CloseButton onClick={toggleModal} />
            </div>
            <div className='flex p-6 flex-col w-full'>
              <div>
                <label className="block text-base text-[#088395] mb-2">Calificanos</label>
                <div className="flex space-x-1 mb-4 gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleChange(star, 'rating')}
                      className="w-6 h-6"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={star <= formData.rating ? '#FFE100' : '#A4A4A4'}
                        strokeWidth="1"
                        className="w-full h-full"
                      >
                        <polygon
                          points="12,2 15,8 22,8 17,13 18,20 12,16 6,20 7,13 2,8 9,8"
                          fill={star <= formData.rating ? '#FFE100' : 'none'}
                        />
                      </svg>
                    </button>
                  ))}
                </div>
                {errors.rating && (
                  <p className="text-sm text-red-500">{errors.rating}</p> // Mensaje de error de calificación
                )}
              </div>
              <div>
                <label className="text-base mb-2 text-[#088395] block">Reseña</label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={(e) => handleChange(e.target.value, 'review')}
                  rows="4"
                  placeholder="Escribe tu reseña."
                  className="w-full border border-[#A9AEB9] rounded-lg text-base p-2 focus:outline-none text-[#9CA3AF]"
                ></textarea>
                {errors.review && (
                  <p className="text-sm text-red-500">{errors.review}</p> // Mensaje de error de reseña
                )}
              </div>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 mt-12 bg-primary-color text-[#EEEEEE] rounded-lg"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
