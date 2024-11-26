import React, { useState } from 'react';
import CloseButton from './CloseButton';

const comments = [
  {
    id: 1,
    name: 'Juan Pérez',
    photo: 'https://via.placeholder.com/50',
    rating: 4.5,
    text: 'Excelente producto, superó mis expectativas. Definitivamente lo recomendaría.',
  },
  {
    id: 2,
    name: 'Ana López',
    photo: 'https://via.placeholder.com/50',
    rating: 3.0,
    text: 'Está bien, pero esperaba más calidad por el precio.',
  },
  {
    id: 3,
    name: 'Carlos Gómez',
    photo: 'https://via.placeholder.com/50',
    rating: 5.0,
    text: 'Impresionante, llegó rápido y es exactamente lo que quería.',
  },
];


const Comments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
  });

  const commentsPerPage = 2;

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const startIndex = (currentPage - 1) * commentsPerPage;
  const currentComments = comments.slice(startIndex, startIndex + commentsPerPage);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const { rating, review } = formData;

    if (rating === 0 || review.trim() === '') {
      alert('Por favor completa la calificación y la reseña.');
      return;
    }

    console.log(formData);
    alert('¡Gracias por tu calificación!');
    setIsModalOpen(false);
    setFormData({
      rating: 0,
      review: '',
    });
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return(
    <>
      <div className='flex justify-between ml-4'>
        <div className='flex gap-4'>
          <span className='montserrat text-[#EEEEEE] text-5xl'>4.2</span>
          <div>
            <p className='text-[#FBFFBD] montserrat font-semibold text-xl'>Very good</p>
            <p className='text-[#EEEEEE] montserrat text-sm'>371 verified reviews</p>
          </div>
        </div>
        <button
          onClick={toggleModal}
          className="bg-[#088395] text-[#EEEEEE] px-4 py-2 rounded mx-3"
        >
            Da tu reseña
        </button>
      </div>
      <div className="mx-4">
        <hr className=" my-5 border-gray-300" />
        {currentComments.map((comment) => (
          <div key={comment.id}>
            <div className="flex items-start my-10 gap-3">
              <img src={comment.photo} alt={comment.name} className="w-14 h-14 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-primary-color text-sm font-bold montserrat">
                      {comment.rating.toFixed(1)} Amaizing
                  </span> |
                  <h3 className="text-base font-medium text-[#F9F9F9] montserrat">{comment.name}</h3>
                </div>
                <p className="text-[#F9F9F9] text-sm  mt-2 montserrat">{comment.text}</p>
              </div>
            </div>
            <hr className="my-4 border-[#FBFFBD]" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-4">
        <button onClick={handlePrev} disabled={currentPage === 1} className="px-5 py-2">
          &lt;
        </button>
        <span className="text-gray-700">{currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages} className="px-5 py-2">
           &gt;
        </button>
      </div>

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
