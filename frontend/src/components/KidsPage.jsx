import { Link } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Category from "./Category";

const products = [
    {
        id: 1,
        name: "Boy's Sweatshirt - Blue Atoll",
        price: "AED355.00",
        image: "/images/boys-sweatshirt-blue.jpg"
    },
    {
        id: 2,
        name: "Girl's Hoodie - Pink Lemonade",
        price: "AED380.00",
        image: "/images/girls-hoodie-pink.jpg"
    },
    {
        id: 3,
        name: "Kid's Joggers - Green",
        price: "AED320.00",
        image: "/images/kids-joggers-green.jpg"
    },
    {
        id: 4,
        name: "Kid's T-Shirt - Yellow",
        price: "AED250.00",
        image: "/images/kids-tshirt-yellow.jpg"
    }
];

export function KidsPage({ onMenuClick }) {
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
                            src="./hero-kid.png"
                            alt="Kids Collection"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                    </div>
                </div>

                {/* Breadcrumb */}
                <div className="flex items-center gap-1 mb-8 text-[14px]">
                    <Link to="/" className="text-[#2c52a4] hover:underline">Home</Link>
                    <span className="text-black">/</span>
                    <span className="text-[#2c52a4]">Kids</span>
                </div>

                {/* Category Section */}
                <Category />

                {/* Products Grid */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-[#1e1e1e] text-[25px]">Kids Products</h2>
                        <Link
                            to="/"
                            className="bg-[#ffe600] px-6 py-2 rounded-[56px] hover:bg-[#f0d900] transition-colors"
                        >
                            <span className="leading-[22px] text-[17px]">Shop All</span>
                        </Link>
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
                                                e.target.src = 'https://via.placeholder.com/300x400/FEC163/DE4313?text=Product+Image';
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
