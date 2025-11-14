import { Menu } from "lucide-react";
import { ShoppingBag } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export function Header({ onMenuClick }) {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    return (
        <header className="bg-white sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between">

                <Link to="/" className="flex items-center hover:opacity-80">
                    <img
                        src="/logo.webp"
                        alt="Modeshworld"
                        className="h-8 object-contain"
                    />
                </Link>

                {/* Center: Nav Links */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/" className="hover:text-[#00a8e3] font-bold">Activewear</Link>
                    <Link to="/women" className="hover:text-[#00a8e3] font-bold">Women</Link>
                    <Link to="/men" className="hover:text-[#00a8e3] font-bold">Men</Link>
                    <Link to="/kids" className="hover:text-[#00a8e3] font-bold">Kids</Link>
                    <Link to="/stationery" className="hover:text-[#00a8e3] font-bold">Stationery</Link>
                </nav>

                {/* Right: Cart + Login/Register */}
                <div className="flex items-center gap-4">
                    {/* My Cart */}
                    <Link
                        to="/cart"
                        className="bg-[#e5f6fc] text-[#2c52a4] px-6 py-2 rounded-[24px] hover:bg-[#d0edf8] transition-colors flex items-center gap-2 relative"
                    >
                        <ShoppingBag className="w-5 h-5 text-[#2c52a4]" />
                        <span className="hidden md:inline font-bold">My Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Login/Register Button with Image */}
                    {/* Login/Register Button */}
                    <Link
                        to="/login"
                        className="relative"
                    >
                        <div
                            className="flex items-center justify-center text-white font-semibold
        bg-no-repeat bg-center bg-contain transition-all duration-300
        hover:opacity-95 select-none"
                            style={{
                                backgroundImage: "url('/login-background.png')",
                                width: "180px",
                                height: "90px",
                            }}
                        >
                            Login or Register
                        </div>
                    </Link>





                    {/* Mobile Menu Icon */}
                    <button
                        onClick={onMenuClick}
                        className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
                        aria-label="Open menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
