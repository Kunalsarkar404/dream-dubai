// src/components/LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ShoppingCart,
    WhatsApp,
    Sms,
    Instagram,
    Facebook,
    Twitter,
    LinkedIn,
    Phone,
    Email,
    Home,
    AccountBalanceWallet,
    ConfirmationNumber,
    EmojiEvents,
    HelpOutline
} from "@mui/icons-material";

export function LoginPage() {
    const navigate = useNavigate();
    const [countryCode, setCountryCode] = useState("+971");
    const [mobile, setMobile] = useState("");
    const [method, setMethod] = useState("whatsapp");

    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f6] text-[#1c1c1c] font-sans">
            {/* Top Navbar */}
            <header className="flex items-center justify-between px-6 lg:px-16 py-4 bg-white shadow-sm">
                <Link to="/" className="flex items-center">
                    <img src="/logo.webp" alt="Dream Dubai" className="h-8" />
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a href="#" className="hover:text-[#ff0055] font-bold">How it works</a>
                    <a href="#" className="hover:text-[#ff0055] font-bold">Wallet</a>
                    <a href="#" className="hover:text-[#ff0055] font-bold">Tickets</a>
                    <a href="#" className="hover:text-[#ff0055] font-bold">Winners</a>
                    <a href="#" className="hover:text-[#ff0055] font-bold">Modesh</a>
                </nav>

                <div className="flex items-center gap-3">
                    <a href="#" className="hidden lg:block">
                        <img src="./appstore.png" alt="App Store" className="h-10 hover:opacity-80 transition-opacity" />
                    </a>
                    <a href="#" className="hidden lg:block">
                        <img src="./playstore.png" alt="Google Play" className="h-10 hover:opacity-80 transition-opacity" />
                    </a>
                </div>
            </header>

            {/* Download Banner */}
            <div className="bg-[#4200ff] text-white text-center py-3 px-4 text-sm">
                Download the Dream Dubai app for the best winning experience&nbsp;
                <button className="bg-white text-[#4200ff] font-semibold rounded-full px-4 py-1 ml-1 text-xs hover:bg-opacity-90">
                    DOWNLOAD
                </button>
            </div>

            {/* Signup Section */}
            <main className="flex flex-col items-center justify-center flex-1 px-4 py-10">
                <div className="max-w-sm w-full bg-white rounded-[20px] shadow-xl overflow-hidden text-center">
                    <div className="bg-[#ff0055] text-white py-6 px-4 relative">
                        <img
                            src="./getafreeticket.png"
                            alt="Get a free ticket to WIN AED 5,000.00"
                            className="w-full h-auto max-w-[280px] mx-auto"
                            onError={(e) => {
                                // Fallback to text if image doesn't load
                                e.target.style.display = 'none';
                                e.target.nextElementSibling.style.display = 'block';
                            }}
                        />
                    </div>

                    <div className="p-6 md:p-8">
                        <p className="font-bold text-[15px] mb-4 tracking-wide">ENTER MOBILE NO.</p>

                        {/* Input Fields */}
                        <div className="flex gap-3 mb-6">
                            <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="border border-[#dedede] rounded-xl px-3 py-3 text-sm w-24 focus:border-[#4200ff] outline-none"
                            >
                                <option value="+971">+971</option>
                                <option value="+91">+91</option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                            </select>
                            <input
                                type="tel"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="Mobile Number"
                                className="flex-1 border border-[#dedede] rounded-xl px-4 py-3 text-sm focus:border-[#4200ff] outline-none"
                            />
                        </div>

                        {/* Send OTP Section */}
                        <p className="uppercase text-sm font-semibold mb-3">Send OTP Via</p>

                        <div className="flex gap-3">
                            {/* WhatsApp Button */}
                            <button
                                onClick={() => setMethod("whatsapp")}
                                className={`flex items-center justify-center gap-2 flex-1 rounded-full py-2 text-sm font-semibold transition
            ${method === "whatsapp"
                                        ? "border-2 border-[#4200ff] text-[#1c1c1c]"
                                        : "border-2 border-[#dedede] text-[#1c1c1c] hover:border-[#4200ff]"
                                    }`}
                            >
                                <WhatsApp className="w-4 h-4" />
                                WhatsApp
                            </button>

                            {/* SMS Button */}
                            <button
                                onClick={() => setMethod("sms")}
                                className={`flex items-center justify-center gap-2 flex-1 rounded-full py-2 text-sm font-semibold transition
            ${method === "sms"
                                        ? "border-2 border-[#4200ff] text-[#1c1c1c]"
                                        : "border-2 border-[#dedede] text-[#1c1c1c] hover:border-[#4200ff]"
                                    }`}
                            >
                                <Sms className="w-4 h-4" />
                                SMS
                            </button>
                        </div>


                        <button
                            onClick={() => mobile.length >= 6 && navigate("/otp")}
                            disabled={mobile.length < 6}
                            className={`w-full mt-6 py-2.5 rounded-full font-semibold uppercase transition 
        ${mobile.length < 6
                                    ? "bg-[#b3b3b3] text-white cursor-not-allowed"
                                    : "bg-gradient-to-t from-[#00a6ff] to-[#5a99ff] text-white cursor-pointer hover:shadow-lg"
                                }`}
                        >
                            Continue
                        </button>

                        <a href="#" className="flex items-center justify-center gap-1 mt-4 text-[13px] underline hover:text-[#4200ff]">
                            <HelpOutline className="w-4 h-4" />
                            Need help? Chat now
                        </a>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-[#eee] py-10 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-x-10 gap-y-6 text-sm">

                    <img src="/logo.webp" alt="Dream Dubai" className="h-10 mb-4" />
                    {/* Logo + Menu */}
                    <div>
                        <ul className="space-y-1">
                            <li><a href="#" className="flex items-center gap-2 hover:text-[#ff0055]"><Home className="w-4 h-4" />Home</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-[#ff0055]"><HelpOutline className="w-4 h-4" />How it works</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-[#ff0055]"><AccountBalanceWallet className="w-4 h-4" />Wallet</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-[#ff0055]"><ConfirmationNumber className="w-4 h-4" />Tickets</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-[#ff0055]"><EmojiEvents className="w-4 h-4" />Winners</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:text-[#ff0055]">User Agreement</a></li>
                            <li><a href="#" className="hover:text-[#ff0055]">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-[#ff0055]">Draw Terms and Conditions</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="w-full">
                        {/* WhatsApp */}
                        <button className="w-full flex justify-between items-start bg-[#1da44e] text-white px-4 py-2 gap-x-8 rounded-lg mb-3 hover:bg-[#187c3e]">
                            <span className="text-left leading-tight">
                                Have questions?<br />Chat with us
                            </span>
                            <WhatsApp className="w-5 h-5 mt-1" />
                        </button>

                        {/* Phone */}
                        <div className="w-full flex justify-between items-start bg-gray-100 text-black px-4 py-2 gap-x-7 rounded-lg mb-3">
                            <span className="text-left leading-tight">
                                Call us: +971 458 8989
                            </span>
                            <div className="w-5 h-5" /> {/* Invisible spacer to match alignment */}
                        </div>

                        {/* Email */}
                        <div className="w-full flex justify-between items-start bg-gray-100 text-black px-4 py-2 gap-x-7 rounded-lg mb-3">
                            <span className="text-left leading-tight">
                                Email: support@dreamdubai.com
                            </span>
                            <div className="w-5 h-5" /> {/* Invisible spacer */}
                        </div>
                    </div>



                    {/* Social + Stores */}
                    <div className="w-full max-w-[260px]">

                        {/* Social Icons – unchanged gap */}
                        <div className="flex gap-x-3 mb-4">
                            <a href="#" className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition-colors">
                                <Instagram className="w-6 h-6 text-black" />
                            </a>
                            <a href="#" className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition-colors">
                                <Facebook className="w-6 h-6 text-black" />
                            </a>
                            <a href="#" className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition-colors">
                                <Twitter className="w-6 h-6 text-black" />
                            </a>
                            <a href="#" className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition-colors">
                                <LinkedIn className="w-6 h-6 text-black" />
                            </a>
                        </div>

                        {/* Store badges*/}
                        <div className="flex gap-2 w-full">
                            <a href="#" className="flex-1">
                                <img
                                    src="./appstore.png"
                                    alt="App Store"
                                    className="h-14 w-full object-contain hover:opacity-70 transition-opacity"
                                />
                            </a>
                            <a href="#" className="flex-1">
                                <img
                                    src="./playstore.png"
                                    alt="Google Play"
                                    className="h-14 w-full object-contain hover:opacity-70 transition-opacity"
                                />
                            </a>
                        </div>

                    </div>
                </div>

                <p className="text-center text-xs text-[#666] mt-10">
                    Dream Dubai © 2025 – All Rights Reserved
                </p>
            </footer>
        </div>
    );
}