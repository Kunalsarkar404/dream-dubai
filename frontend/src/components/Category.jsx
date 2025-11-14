import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
    {
        id: 1,
        title: "Activewear",
        image: "./category-activewear.png",
        gradient: "from-[#00a8ff] to-[#007bff]",
    },
    {
        id: 2,
        title: "Women",
        image: "./category-women.png",
        gradient: "from-[#ffb6c1] to-[#ff69b4]",
    },
    {
        id: 3,
        title: "Men",
        image: "./category-men.png",
        gradient: "from-[#a1c4fd] to-[#c2e9fb]",
    },
    {
        id: 4,
        title: "Kids",
        image: "./category-kid.png",
        gradient: "from-[#fbc2eb] to-[#a6c1ee]",
    },
    {
        id: 5,
        title: "Stationery",
        image: "./category-stationery.png",
        gradient: "from-[#84fab0] to-[#8fd3f4]",
    },
];

export default function Category() {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const scrollAmount = 280;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <section className="relative max-w-[1400px] mx-auto pl-12 pr-4 py-10">
            <h2 className="text-2xl font-bold mb-6">Category</h2>

            {/* Left Arrow */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md p-2 rounded-full hover:scale-105 transition-transform"
                aria-label="Scroll left"
            >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="relative flex-shrink-0 w-[300px] h-[160px] rounded-[28px] overflow-hidden cursor-pointer snap-start border-2 border-gray-200 group transition-all duration-500 hover:shadow-xl bg-white"
                    >
                        {/* Blue-White Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#75a7f7] to-[#9edefc] opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-10"></div>

                        {/* Text */}
                        <div className="absolute z-20 bottom-6 left-6 text-black group-hover:text-white font-semibold text-lg transition-colors duration-300">
                            {cat.title}
                        </div>

                        {/* Image */}
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="absolute right-0 bottom-0 h-full w-auto object-contain object-bottom transition-transform duration-500 ease-out group-hover: z-20"
                        />

                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            <button
                onClick={() => scroll("right")}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md p-2 rounded-full hover:scale-105 transition-transform"
                aria-label="Scroll right"
            >
                <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
        </section>
    );
}
