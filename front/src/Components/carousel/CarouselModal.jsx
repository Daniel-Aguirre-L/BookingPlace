import React from 'react'
import EmblaCarousel from './EmblaCarousel'

const CarouselModal = ({ cabin, showCarousel, onClose }) => {

    const OPTIONS = { loop: true }
    const SLIDE_COUNT = cabin.images.length
    const SLIDES = cabin.images.map((image) => image.url)

    return (
        <section className={`${showCarousel ? "w-full h-[100%] animate-fadeIn" : "h-0 w-0 overflow-hidden"} fixed top-0 right-0 bg-background-dark bg-opacity-85 flex justify-center transition-all]`} >
            <div>
                <div className='w-full flex justify-end pt-40 pr-5 mb-10'>
                    <button
                        type="button"
                        className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full  border-2 border-[#FBFFBD] bg-[#088395] text-gray-800 "
                        aria-label="Close"
                        onClick={onClose}
                    >
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" color="#FBFFBD" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>

                </div>
                <div className='max-w-[1600px] w-full h-full flex flex-col justify-start items-center  pb-[250px] px-3'>
                    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                </div>
            </div>
        </section>
    )
}

export default CarouselModal