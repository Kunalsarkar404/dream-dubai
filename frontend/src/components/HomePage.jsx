import { Link } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Category from "./Category";

const products = [
    {
        id: 1,
        name: "Men's Sweatshirt - Green Ash",
        price: "AED541.00",
        image: "/images/mens-sweatshirt-green.jpg"
    },
    {
        id: 2,
        name: "Women's Hoodie - Pale Banana",
        price: "AED625.00",
        image: "/images/womens-hoodie-banana.jpg"
    },
    {
        id: 3,
        name: "Men's Hoodie - Papaya Punch",
        price: "AED625.00",
        image: "/images/mens-hoodie-papaya.jpg"
    },
    {
        id: 4,
        name: "Boy's Sweatshirt - Blue Atoll",
        price: "AED355.00",
        image: "/images/boys-sweatshirt-blue.jpg"
    }
];

const categories = [
    { name: "Activewear", image: "/images/activewear.jpg" },
    { name: "Women", image: "/images/women.jpg" },
    { name: "Men", image: "/images/men.jpg" },
    { name: "Kids", image: "/images/kids.jpg" }
];

export function HomePage({ onMenuClick }) {
    return (
        <div className="bg-white min-h-screen w-full">
            {/* Header */}
            <Header onMenuClick={onMenuClick} />

            {/* Main Banner */}
            <div className="relative w-full overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-4 py-8">
                    <div className="relative w-full h-[510px] overflow-hidden rounded-[48px]">
                        {/* Hero Background Image */}
                        <img
                            src="./home-banner.png"
                            alt="Hero"
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{
                                clipPath:
                                    'path("M0,0 H100% V85% C90% 100%,10% 100%,0 85% Z")',
                            }}
                        />

                        {/* Overlay Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-wide">
                                NEW COLLECTION
                            </h1>
                            <button className="bg-[#ffe600] px-10 py-4 rounded-full text-black font-semibold hover:bg-[#f0d900] transition-all shadow-lg">
                                Explore
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* New Arrivals Section */}
            <section className="max-w-[1400px] mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-[28px] md:text-[32px]">New Arrivals</h2>
                    <button className="bg-[#ffe600] px-6 py-2 rounded-[24px] hover:bg-[#f0d900] transition-colors">
                        Shop All
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group cursor-pointer"
                        >
                            <div className="flex flex-col gap-3">
                                <div className="relative rounded-[48px] overflow-hidden aspect-[4/5] bg-gray-100">
                                    <img
                                        alt={product.name}
                                        className="absolute w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        src={product.image}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300x400/e5e7eb/9ca3af?text=Product+Image';
                                        }}
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="leading-[29px] text-[18px] md:text-[21px]">{product.name}</p>
                                    <p className="leading-[22px] text-[18px] md:text-[21px] mt-1">{product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Category Section */}
            <Category />

            {/* Footer */}
            <Footer />
        </div>
    );
}