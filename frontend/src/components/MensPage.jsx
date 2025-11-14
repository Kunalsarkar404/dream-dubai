import { Link } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Category from "./Category";
import { getProductsByCategory } from "../data/mockProducts";

const products = getProductsByCategory('men');

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
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="group cursor-pointer"
                            >
                                <div className="flex flex-col gap-3">
                                    <div className="relative rounded-[48px] overflow-hidden aspect-[4/5] bg-gray-100">
                                        <img
                                            alt={product.name}
                                            className="absolute w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            src={product.images[0]}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/300x400/e5e7eb/9ca3af?text=Product+Image';
                                            }}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <p className="leading-[29px] text-[18px] md:text-[21px] mb-1">{product.name}</p>
                                        <p className="leading-[22px] text-[18px] md:text-[21px]">{product.currency} {product.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}