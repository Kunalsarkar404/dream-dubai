import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import {
    Add,
    Remove,
    LocalShipping,
    SwapHoriz,
    Close
} from "@mui/icons-material";

// Mock Product Data
const mockProducts = {
    "1": {
        id: "1",
        name: "Men's Premium Cotton Hoodie",
        description: "Experience ultimate comfort with our premium cotton hoodie. Made from 100% organic cotton with a soft brushed interior, this hoodie features a relaxed fit perfect for everyday wear. The durable fabric ensures long-lasting quality while maintaining breathability. Perfect for casual outings or lounging at home.",
        price: 625.00,
        currency: "AED",
        colors: [
            { name: "black", hex: "#000000" },
            { name: "white", hex: "#FFFFFF" },
            { name: "navy", hex: "#1E3A8A" },
            { name: "gray", hex: "#6B7280" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&h=1000&fit=crop"
        ]
    },
    "2": {
        id: "2",
        name: "Women's Luxury Sweatshirt",
        description: "Indulge in luxury with our premium sweatshirt crafted from the finest materials. Featuring a contemporary design with exceptional attention to detail, this piece combines style and comfort effortlessly. The soft fabric drapes beautifully while providing warmth and comfort.",
        price: 550.00,
        currency: "AED",
        colors: [
            { name: "rose", hex: "#FFB6C1" },
            { name: "lavender", hex: "#E6E6FA" },
            { name: "cream", hex: "#FFFDD0" },
            { name: "sage", hex: "#9DC183" }
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        images: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1614251055880-b5e3e6eb3fb3?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop"
        ]
    },
    "3": {
        id: "3",
        name: "Kids' Adventure Joggers",
        description: "Let your little ones explore in comfort with our durable adventure joggers. Made with active kids in mind, these joggers feature reinforced knees, adjustable waistband, and plenty of stretch for all-day play. The moisture-wicking fabric keeps them dry during activities.",
        price: 355.00,
        currency: "AED",
        colors: [
            { name: "blue", hex: "#4A90E2" },
            { name: "green", hex: "#7ED321" },
            { name: "orange", hex: "#F5A623" },
            { name: "purple", hex: "#9013FE" }
        ],
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
        images: [
            "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1519278409-aa1e39022b2a?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&h=1000&fit=crop"
        ]
    },
    "4": {
        id: "4",
        name: "Classic Denim Jacket",
        description: "A timeless wardrobe essential, our classic denim jacket never goes out of style. Featuring authentic details, quality construction, and a perfect wash, this jacket gets better with age. Pair it with anything from casual jeans to dresses for versatile styling options.",
        price: 780.00,
        currency: "AED",
        colors: [
            { name: "light-wash", hex: "#A4C8E1" },
            { name: "medium-wash", hex: "#4682B4" },
            { name: "dark-wash", hex: "#1C3A5C" },
            { name: "black", hex: "#000000" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        images: [
            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1543076499-a7e3f4c95cdb?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=800&h=1000&fit=crop"
        ]
    }
};

export function ProductPage({ onMenuClick }) {
    const navigate = useNavigate();
    const { id } = useParams();

    // Get product from mock data or use default
    const product = mockProducts[id] || mockProducts["1"];

    const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
    const [selectedSize, setSelectedSize] = useState(product.sizes[2] || product.sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const [primaryImage, setPrimaryImage] = useState(product.images[0]);
    const [showSizeChart, setShowSizeChart] = useState(false);

    const sizeChartData = [
        { size: "XS", chest: "86-91", waist: "71-76", hips: "86-91" },
        { size: "S", chest: "91-96", waist: "76-81", hips: "91-96" },
        { size: "M", chest: "96-101", waist: "81-86", hips: "96-101" },
        { size: "L", chest: "101-106", waist: "86-91", hips: "101-106" },
        { size: "XL", chest: "106-111", waist: "91-96", hips: "106-111" },
        { size: "XXL", chest: "111-116", waist: "96-101", hips: "111-116" }
    ];

    const handleQuantityChange = (action) => {
        if (action === "increase") {
            setQuantity(prev => prev + 1);
        } else if (action === "decrease" && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToBag = () => {
        // Add to bag logic
        navigate("/cart");
    };

    return (
        <div className="bg-white min-h-screen w-full">
            {/* Header */}
            <Header onMenuClick={onMenuClick} />

            {/* Main Content */}
            <main className="max-w-[1400px] mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Section - Images */}
                    <div className="flex flex-col-reverse lg:flex-row gap-4">
                        {/* Secondary Images - Vertical Row */}
                        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setPrimaryImage(image)}
                                    className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all ${primaryImage === image
                                        ? "border-black"
                                        : "border-gray-200 hover:border-gray-400"
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`Product view ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = `https://via.placeholder.com/400x400/e5e7eb/9ca3af?text=View+${index + 1}`;
                                        }}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Primary Image - Large */}
                        <div className="flex-1 rounded-2xl overflow-hidden bg-gray-100">
                            <img
                                src={primaryImage}
                                alt={product.name}
                                className="w-full h-auto object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/800x1000/e5e7eb/9ca3af?text=Product+Image';
                                }}
                            />
                        </div>
                    </div>

                    {/* Right Section - Product Details */}
                    <div className="flex flex-col">
                        {/* Product Name */}
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

                        {/* Description */}
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Price */}
                        <div className="mb-6">
                            <p className="text-3xl font-bold">
                                {product.currency} {product.price.toFixed(2)}
                            </p>
                        </div>

                        {/* Select Colour */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-3">
                                Select Colour: <span className="font-normal capitalize">{selectedColor}</span>
                            </label>
                            <div className="flex gap-3">
                                {product.colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color.name
                                            ? "border-black scale-110"
                                            : "border-gray-300 hover:border-gray-500"
                                            }`}
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    >
                                        {color.hex === "#FFFFFF" && (
                                            <div className="w-full h-full rounded-full border border-gray-200"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Select Size */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-semibold">Select Size</label>
                                <button
                                    onClick={() => setShowSizeChart(true)}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Size Chart
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`min-w-[3.5rem] h-14 px-3 rounded-full border-2 font-semibold transition-all ${selectedSize === size
                                            ? "bg-[#00a8e3] text-white"
                                            : "border-gray-300 hover:border-[#00a8e3]"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-3">Quantity</label>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => handleQuantityChange("decrease")}
                                    disabled={quantity === 1}
                                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition"
                                >
                                    <Remove className="w-5 h-5" />
                                </button>
                                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange("increase")}
                                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-black transition"
                                >
                                    <Add className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Add to Bag Button */}
                        <button
                            onClick={handleAddToBag}
                            className="w-3/12 bg-gradient-to-tr from-[#018ff4] to-[#4ecffe] text-white py-4 rounded-full font-semibold hover:bg-gray-800 transition mb-8"
                        >
                            Add to Bag
                        </button>

                        {/* Shipping and Returns */}
                        <div className="space-y-4 border-t pt-6">
                            <div className="flex gap-4">
                                <LocalShipping className="w-6 h-6 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-2">Shipping</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Free standard shipping on orders over AED 200. Express shipping available for AED 25.
                                        Orders are typically processed within 1-2 business days and delivered within 3-5 business days.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <SwapHoriz className="w-6 h-6 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-2">Returns</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        We offer free returns within 30 days of purchase. Items must be unworn, unwashed,
                                        and in original condition with tags attached. Refunds will be processed within 5-7 business days
                                        after we receive your return.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Size Chart Modal */}
            {showSizeChart && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Size Chart</h2>
                            <button
                                onClick={() => setShowSizeChart(false)}
                                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
                            >
                                <Close className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6">
                            <p className="text-sm text-gray-600 mb-4">
                                All measurements are in centimeters (cm)
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-black">
                                            <th className="text-left py-3 px-4 font-semibold">Size</th>
                                            <th className="text-left py-3 px-4 font-semibold">Chest</th>
                                            <th className="text-left py-3 px-4 font-semibold">Waist</th>
                                            <th className="text-left py-3 px-4 font-semibold">Hips</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sizeChartData.map((row, index) => (
                                            <tr
                                                key={row.size}
                                                className={`border-b ${selectedSize === row.size ? "bg-gray-100" : ""
                                                    }`}
                                            >
                                                <td className="py-3 px-4 font-semibold">{row.size}</td>
                                                <td className="py-3 px-4">{row.chest}</td>
                                                <td className="py-3 px-4">{row.waist}</td>
                                                <td className="py-3 px-4">{row.hips}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold mb-2">How to Measure</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• <strong>Chest:</strong> Measure around the fullest part of your chest</li>
                                    <li>• <strong>Waist:</strong> Measure around your natural waistline</li>
                                    <li>• <strong>Hips:</strong> Measure around the fullest part of your hips</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
}
