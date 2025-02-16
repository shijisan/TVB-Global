"use client";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";

export default function HomeAbout() {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);

    const slides = [
        {
            year: "2020",
            content: (
                <div className="h-fit">
                    <h1 className="text-4xl font-medium poppins">About The VA BAR (2020)</h1>
                    <p>2020 was the beginning of our journey, connecting aspiring Virtual Assistants worldwide.</p>
                </div>
            ),
        },
        {
            year: "2021",
            content: (
                <div className="h-fit">
                    <h1 className="text-4xl font-medium poppins">Growth & Expansion (2021)</h1>
                    <p>We expanded our reach and provided more resources for freelancers.</p>
                </div>
            ),
        },
        {
            year: "2022",
            content: (
                <div className="h-fit">
                    <h1 className="text-4xl font-medium poppins">New Innovations (2022)</h1>
                    <p>Lorem ipsum.</p>
                </div>
            ),
        },
        {
            year: "2023",
            content: (
                <div className="h-fit">
                    <h1 className="text-4xl font-medium poppins">Community Strength (2023)</h1>
                    <p>More members joined, and we launched mentorship programs.</p>
                </div>
            ),
        },
        {
            year: "2024",
            content: (
                <div className="h-fit">
                    <h1 className="text-4xl font-medium poppins">Scaling Up (2024)</h1>
                    <p>We introduced new training programs and partnerships.</p>
                </div>
            ),
        },
        {
            year: "2025",
            content: (
                <div className="h-fit">
                    <h1 className="text-4xl font-medium poppins">Future Ahead (2025)</h1>
                    <p>Exciting developments await as we continue our mission.</p>
                </div>
            ),
        },
    ];

    return (
        <section className="w-full">
            <div className="max-w-6xl w-full flex md:flex-row flex-col mx-auto md:min-h-[70vh] min-h-screen">

                <div className="md:w-1/2 w-full">
                    <h1 className="my-8 text-4xl font-semibold poppins text-center">COMPANY HISTORY</h1>
                    <div className="h-full w-full grid text-white grid-cols-2 grid-rows-3 poppins px-4 gap-4 max-h-[60vh]">
                        {slides.map((slide, index) => (
                            <button
                                key={index}
                                className={`transition-all py-4 px-6 rounded-lg poppins ${activeIndex === index ? "bg-red-700 text-mustard font-medium" : index % 2 === 0 ? "bg-red-900" : "bg-red-950"
                                    } hover:brightness-110`}
                                onClick={() => {
                                    setActiveIndex(index);
                                    if (swiperRef.current) swiperRef.current.slideTo(index);
                                }}
                            >
                                <h1>{slide.year}</h1>
                            </button>
                        ))}
                    </div>

                </div>


                <div className="md:w-1/2 w-full flex flex-col justify-center px-4 md:text-end text-center md:flex-grow-0 flex-grow">
                    <Swiper
                        slidesPerView={1}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        modules={[Autoplay, EffectFade]}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        className="w-full"
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index} className="flex items-center justify-center">
                                {slide.content}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}