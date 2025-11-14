// src/components/OTPPage.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    WhatsApp,
    Instagram,
    Facebook,
    Twitter,
    LinkedIn,
    Home,
    AccountBalanceWallet,
    ConfirmationNumber,
    EmojiEvents,
    HelpOutline
} from "@mui/icons-material";

export function OTPPage() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        const otpValue = otp.join("");
        if (otpValue.length === 4) {
            // Navigate to signup page
            navigate("/signup");
        }
    };

    const isOtpComplete = otp.every(digit => digit !== "");

    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f6] text-[#1c1c1c] font-sans">
            {/* Top Navbar */}
            <header className="flex items-center justify-between px-6 lg:px-16 py-4 bg-white shadow-sm">
                <div className="flex items-center gap-2">
                    <img src="/logo.webp" alt="Dealz7" className="h-12" />
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a href="#" className="hover:text-[#ff0055] font-bold">How it works</a>
                    <a href="#" className="hover:text-[#ff0055] font-bold">Wallet</a>
                    <a href="#" className="hover:text-[#ff0055] font-bold">Tickets</a>
                    <a href="#" className="hover:text-[#ff0055] font-bold">Winners</a>
                    <a href="#" className="hover:text-[#ff0055] font-bold">Modesh</a>
                </nav>

                <div className="flex items-center gap-3">
                    <a href="#" className="hidden lg:block">
                        <img src="./appstore.png" alt="App Store" className="h-8 hover:opacity-80 transition-opacity" />
                    </a>
                    <a href="#" className="hidden lg:block">
                        <img src="./playstore.png" alt="Google Play" className="h-8 hover:opacity-80 transition-opacity" />
                    </a>
                </div>
            </header>

            {/* Download Banner */}
            <div className="bg-[#4200ff] text-white text-center py-3 px-4 text-sm">
                Download the Dealz7 app for the best winning experience&nbsp;
                <button className="bg-white text-[#4200ff] font-semibold rounded-full px-4 py-1 ml-1 text-xs hover:bg-opacity-90">
                    DOWNLOAD
                </button>
            </div>

            {/* OTP Verification Section */}
            <main className="flex flex-col items-center justify-center flex-1 px-4 py-10">
                <div className="max-w-sm w-full bg-white rounded-[20px] shadow-xl overflow-hidden text-center">
                    <div className="bg-[#ff0055] text-white py-6 px-4 relative">
                        <img
                            src="./getafreeticket.png"
                            alt="Get a free ticket to WIN AED 5,000.00"
                            className="w-full h-auto max-w-[280px] mx-auto"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>

                    <div className="p-6 md:p-8">
                        <p className="font-bold text-[15px] mb-2 tracking-wide">ENTER OTP</p>
                        <p className="text-sm text-gray-600 mb-6">
                            We've sent a 4-digit code to your mobile
                        </p>

                        {/* OTP Input Fields */}
                        <div className="flex gap-3 justify-center mb-6">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-14 h-14 border-2 border-[#dedede] rounded-xl text-center text-2xl font-semibold focus:border-[#4200ff] outline-none transition"
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleVerify}
                            disabled={!isOtpComplete}
                            className={`w-full py-2.5 rounded-full font-semibold uppercase transition 
                                ${!isOtpComplete
                                    ? "bg-[#b3b3b3] text-white cursor-not-allowed"
                                    : "bg-gradient-to-t from-[#4200ff] to-[#5a7bff] text-white cursor-pointer hover:shadow-lg"
                                }`}
                        >
                            Verify
                        </button>

                        <button
                            onClick={() => navigate("/login")}
                            className="w-full mt-3 text-sm text-[#4200ff] hover:underline"
                        >
                            ← Back to login
                        </button>

                        <button className="mt-4 text-[13px] text-gray-600 hover:text-[#4200ff]">
                            Didn't receive code? <span className="underline font-semibold">Resend</span>
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
                    <img src="/logo.webp" alt="Dealz7" className="h-16 mb-4" />

                    <div>
                        <ul className="space-y-1">
                            <li><a href="#" className="flex items-center gap-2 hover:text-[#ff0055]"><Home className="w-4 h-4" />Home</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-[#ff0055]"><HelpOutline className="w-4 h-4" />How it works</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-[#ff0055]"><AccountBalanceWallet className="w-4 h-4" />Wallet</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-[#ff0055]"><ConfirmationNumber className="w-4 h-4" />Tickets</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-[#ff0055]"><EmojiEvents className="w-4 h-4" />Winners</a></li>
                        </ul>
                    </div>

                    <div>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:text-[#ff0055]">User Agreement</a></li>
                            <li><a href="#" className="hover:text-[#ff0055]">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-[#ff0055]">Draw Terms and Conditions</a></li>
                        </ul>
                    </div>

                    <div className="w-full">
                        <button className="w-full flex justify-between items-start bg-[#1da44e] text-white px-4 py-2 gap-x-8 rounded-lg mb-3 hover:bg-[#187c3e]">
                            <span className="text-left leading-tight">
                                Have questions?<br />Chat with us
                            </span>
                            <WhatsApp className="w-5 h-5 mt-1" />
                        </button>

                        <div className="w-full flex justify-between items-start bg-gray-100 text-black px-4 py-2 gap-x-7 rounded-lg mb-3">
                            <span className="text-left leading-tight">
                                Call us: +971 458 8989
                            </span>
                            <div className="w-5 h-5" />
                        </div>

                        <div className="w-full flex justify-between items-start bg-gray-100 text-black px-4 py-2 gap-x-7 rounded-lg mb-3">
                            <span className="text-left leading-tight">
                                Email: support@dealz7.com
                            </span>
                            <div className="w-5 h-5" />
                        </div>
                    </div>

                    <div>
                        <div className="flex gap-4 mb-4">
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

                        <div className="flex gap-2">
                            <a href="#">
                                <img src="./appstore.png" alt="App Store" className="h-12 hover:opacity-70 transition-opacity" />
                            </a>
                            <a href="#">
                                <img src="./playstore.png" alt="Google Play" className="h-12 hover:opacity-70 transition-opacity" />
                            </a>
                        </div>
                    </div>
                </div>

                <p className="text-center text-xs text-[#666] mt-10">
                    Dealz7 © 2025 – All Rights Reserved
                </p>
            </footer>
        </div>
    );
}
