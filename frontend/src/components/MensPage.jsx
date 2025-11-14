import { Link } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Category from "./Category";

const categories = [
    { name: "Women", image: "/images/women.jpg" },
    { name: "Men", image: "/images/men.jpg", active: true },
    { name: "Kids", image: "/images/kids.jpg" },
    { name: "Stationery", image: "/images/stationery.jpg" }
];

const products = [
    {
        id: 1,
        name: "Men's Sweatshirt - Green Ash",
        price: "AED410.00",
        image: "/images/mens-sweatshirt-green.jpg"
    },
    {
        id: 2,
        name: "Men's Dip-Dye Hoodie - Tender Yellow/Green Ash",
        price: "AED700.00",
        image: "/images/mens-hoodie-dip-dye.jpg"
    },
    {
        id: 3,
        name: "Men's Dip-Dye Hoodie - Short Bread/Papaya Punch",
        price: "AED700.00",
        image: "/images/mens-hoodie-papaya.jpg"
    },
    {
        id: 4,
        name: "Men's Hoodie - Short Bread",
        price: "AED625.00",
        image: "/images/mens-hoodie-shortbread.jpg"
    }
];

export function MensPage({ onMenuClick }) {
    return (
        <div className="bg-white min-h-screen w-full">
            {/* Header */}
            <Header onMenuClick={onMenuClick} />

            {/* Main Content */}
            <main className="max-w-[1400px] mx-auto px-4 py-8">
                {/* Hero Banner */}
                <div className="relative w-full mb-8">
                    <div
                        className="relative w-full h-[250px] md:h-[350px] lg:h-[378px] overflow-hidden"

                    >
                        <img
                            src="./hero-men.png"
                            alt="Men's Collection"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                    </div>
                </div>                {/* Breadcrumb */}
                <div className="flex items-center gap-1 mb-8 text-[14px]">
                    <Link to="/" className="text-[#2c52a4] hover:underline">Home</Link>
                    <span className="text-black">/</span>
                    <span className="text-[#2c52a4]">Men</span>
                </div>

                {/* Category Section */}
                <Category />

                {/* Products Grid */}
                <section className="mb-12">
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
                                        <p className="leading-[29px] text-[18px] md:text-[21px] mb-1">{product.name}</p>
                                        <p className="leading-[22px] text-[18px] md:text-[21px]">{product.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}