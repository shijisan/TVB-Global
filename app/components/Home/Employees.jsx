"use client";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

export default function HomeEmployees() {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);

    const employees = [
        {
            name: "John Doe",
            role: "CEO & Founder",
            image: "https://placehold.co/300x200/webp",
            description: "John leads the company with a vision for innovation and growth."
        },
        {
            name: "Jane Smith",
            role: "Head of Operations",
            image: "https://placehold.co/300x200/webp",
            description: "Jane ensures smooth operations and effective project execution."
        },
        {
            name: "Alex Johnson",
            role: "Lead Developer",
            image: "https://placehold.co/300x200/webp",
            description: "Alex spearheads our development team, pushing technological boundaries."
        },
        {
            name: "Emily Davis",
            role: "Marketing Manager",
            image: "https://placehold.co/300x200/webp",
            description: "Emily crafts marketing strategies that drive brand awareness and engagement."
        }
    ];

    return (
        <section className="w-full">
            <div className="max-w-6xl w-full flex md:flex-row flex-col mx-auto md:min-h-[70vh] min-h-screen  md:pt-0 pt-[10vh]">
                {/* Swiper for Employee Images */}
                <div className="md:w-1/2 w-full flex justify-center items-center overflow-x-hidden">
                    <Swiper
                        effect="cards"
                        grabCursor={true}
                        modules={[EffectCards]}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        className="max-w-[300px] h-[400px] md:w-full p-[1rem!important]"
                    >
                        {employees.map((employee, index) => (
                            <SwiperSlide key={index} className="flex justify-center items-center">
                                <img src={employee.image} alt={employee.name} className="rounded-lg shadow-lg w-full h-full object-cover" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Employee Details */}
                <div className="md:w-1/2 w-full flex flex-col justify-center px-4 text-start md:pt-0 pt-8">
                    <h1 className="text-4xl font-semibold poppins mb-6">Meet Our Team</h1>
                    <h2 className="text-2xl font-medium poppins">{employees[activeIndex].name}</h2>
                    <h3 className="text-xl poppins text-gray-400">{employees[activeIndex].role}</h3>
                    <p className="mt-4 text-lg poppins">{employees[activeIndex].description}</p>
                </div>
            </div>
        </section>
    );
}
