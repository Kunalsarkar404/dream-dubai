import { Link } from "react-router-dom";
import { Header } from "./Header";

export function CartPage({ onMenuClick }) {
    return (
        <div className="bg-white min-h-screen w-full flex flex-col">
            {/* Header */}
            <Header onMenuClick={onMenuClick} />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="max-w-[600px] w-full flex flex-col items-center gap-5">
                    {/* Empty Bag Icon */}
                    <div className="h-[130px] w-[112px] relative flex items-center justify-center">
                        <img
                            src="./cart.png"
                            alt="Empty Cart"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Empty State Text */}
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

                    {/* See New Arrivals Button */}
                    <Link
                        to="/"
                        className="bg-[#ffe600] px-8 py-3 rounded-[56px] hover:bg-[#f0d900] transition-colors mt-4"
                    >
                        <p className="leading-[22px] text-[17px] whitespace-pre">See new arrivals</p>
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-[#e0e0e0] py-12 px-4 mt-auto">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center hover:opacity-80">
                                <img src="/logo.webp" alt="Modeshworld" className="h-8" />
                            </Link>
                        </div>

                        {/* Links */}
                        <div className="flex gap-8">
                            <Link to="/" className="hover:text-[#00a8e3]">Terms of Use</Link>
                            <Link to="/" className="hover:text-[#00a8e3]">Terms of Sale</Link>
                            <Link to="/" className="hover:text-[#00a8e3]">Privacy Policy</Link>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {/* Social media icons can be added here */}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}