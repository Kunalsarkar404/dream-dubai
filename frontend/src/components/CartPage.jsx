import { Link, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useCart } from "../context/CartContext";
import { Add, Remove, Delete } from "@mui/icons-material";

export function CartPage({ onMenuClick }) {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, updateQuantity, removeFromCart } = useCart();

    const subtotal = getCartTotal();
    const shipping = subtotal > 200 ? 0 : 25;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="bg-white min-h-screen w-full flex flex-col">
                <Header onMenuClick={onMenuClick} />
                <main className="flex-1 flex items-center justify-center px-4 py-12">
                    <div className="max-w-[600px] w-full flex flex-col items-center gap-5">
                        <div className="h-[130px] w-[112px] relative flex items-center justify-center">
                            <img
                                src="./cart.png"
                                alt="Empty Cart"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="flex flex-col justify-center leading-[0] text-center">
                                <p className="leading-[31px] text-[24px] whitespace-pre">Your bag is empty.</p>
                            </div>
                            <div className="flex flex-col justify-center leading-[0] text-center">
                                <p className="leading-[31px] text-[24px] whitespace-pre">
                                    Looks like you haven't added anything to your bag yet.
                                </p>
                            </div>
                        </div>
                        <Link
                            to="/"
                            className="bg-[#ffe600] px-8 py-3 rounded-[56px] hover:bg-[#f0d900] transition-colors mt-4"
                        >
                            <p className="leading-[22px] text-[17px] whitespace-pre">See new arrivals</p>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen w-full">
            <Header onMenuClick={onMenuClick} />

            <main className="max-w-[1400px] mx-auto px-4 py-10">
                <h1 className="text-[32px] font-semibold mb-10">My Bag</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Cart Items */}
                    <div className="lg:col-span-2 space-y-8">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-start gap-6 pb-6">

                                {/* Image */}
                                <div className="w-32 h-40 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Middle Content */}
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <p className="text-[20px] font-semibold leading-tight max-w-[80%]">
                                            {item.name}
                                        </p>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-500 hover:text-black text-lg"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    {/* Price */}
                                    <p className="text-[18px] font-semibold mb-3">
                                        AED {item.price.toFixed(2)}
                                    </p>

                                    {/* Color + Size + Quantity in one row */}
                                    <div className="flex items-center justify-between mb-6">

                                        {/* Left: Color + Size */}
                                        <div className="flex items-center gap-4">
                                            {/* Color */}
                                            <button
                                                className="w-10 h-10 rounded-full border-2 border-gray-300"
                                                style={{ backgroundColor: item.colorHex || '#000000' }}
                                                title={item.color}
                                            >
                                                {item.colorHex === "#FFFFFF" && (
                                                    <div className="w-full h-full rounded-full border border-gray-200"></div>
                                                )}
                                            </button>

                                            {/* Size */}
                                            <span className="min-w-[3.5rem] h-10 px-3 flex items-center justify-center rounded-full border-2 border-gray-300 font-semibold text-sm">
                                                {item.size}
                                            </span>
                                        </div>

                                        {/* Right: Quantity */}
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity === 1}
                                                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-lg disabled:opacity-40"
                                            >
                                                –
                                            </button>

                                            <span className="text-lg font-semibold">{item.quantity}</span>

                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-lg"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Summary Card */}
                    <div>
                        <div className="rounded-2xl shadow-md p-8 bg-white sticky top-10">
                            <h2 className="text-[24px] font-semibold mb-6">Payment Summary</h2>

                            <div className="flex justify-between text-[18px] mb-6">
                                <span>Total ({cartItems.length} Items)</span>
                                <span className="font-semibold">AED {subtotal.toFixed(2)}</span>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={() => navigate("/checkout")}
                                className="w-full py-4 rounded-full bg-gradient-to-l from-[#ffe600] to-[#ffcc00] font-bold text-[18px] mb-4"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}