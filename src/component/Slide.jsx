import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Slide = ({ items, renderItem, itemsPerView = 3 }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesPerView = itemsPerView;

    const nextSlide = () => {
        if (currentSlide < Math.ceil(items.length / slidesPerView) - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    return (
        <div className='relative mt-10'>
            {items.length > slidesPerView && (
                <>
                    <button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 w-12 h-12 rounded-full bg-[#FFC100] text-white ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#e0a800]'}`}
                        aria-label="Previous slide"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
                    </button>

                    <button
                        onClick={nextSlide}
                        disabled={currentSlide >= Math.ceil(items.length / slidesPerView) - 1}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 w-12 h-12 rounded-full bg-[#FFC100] text-white ${currentSlide >= Math.ceil(items.length / slidesPerView) - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#e0a800]'}`}
                        aria-label="Next slide"
                    >
                        <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
                    </button>
                </>
            )}

            <div className='overflow-hidden px-8'>
                <div
                    className='flex transition-transform duration-300 ease-in-out'
                    style={{ transform: `translateX(-${currentSlide * 100 / Math.ceil(items.length / slidesPerView)}%)` }}
                >
                    {items.map((item, index) => (
                        <div key={index} className={`min-w-[calc(100%/${slidesPerView}-20px)] mx-5`}>
                            {renderItem(item)}
                        </div>
                    ))}
                </div>
            </div>

            {items.length > slidesPerView && (
                <div className='flex justify-center mt-4'>
                    {Array.from({ length: Math.ceil(items.length / slidesPerView) }).map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 w-2 mx-1 rounded-full ${currentSlide === index ? 'bg-[#FFC100]' : 'bg-gray-300'}`}
                            onClick={() => setCurrentSlide(index)}
                            role="button"
                            aria-label={`Go to slide ${index + 1}`}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Slide;