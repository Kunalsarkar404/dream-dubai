import { Link } from "react-router-dom";
import { Instagram, Facebook, Music2 } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-8 px-4">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left - Logo */}
                <Link to="/" className="flex-shrink-0">
                    <img
                        src="./logo.webp"
                        alt="Dream Dubai"
                        className="h-10 w-auto"
                    />
                </Link>

                {/* Center - Links */}
                <div className="flex items-center justify-center gap-8 text-sm font-semibold text-black">
                    <Link
                        to="/terms-of-use"
                        className="hover:text-[#00a8e3] transition-colors"
                    >
                        Terms of Use
                    </Link>
                    <Link
                        to="/terms-of-sale"
                        className="hover:text-[#00a8e3] transition-colors"
                    >
                        Terms of Sale
                    </Link>
                    <Link
                        to="/privacy-policy"
                        className="hover:text-[#00a8e3] transition-colors"
                    >
                        Privacy Policy
                    </Link>
                </div>

                {/* Right - Social Icons */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#2c52a4] p-2 rounded-full hover:scale-105 transition-transform"
                    >
                        <Instagram className="w-5 h-5 text-white" />
                    </a>
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#2c52a4] p-2 rounded-full hover:scale-105 transition-transform"
                    >
                        <Facebook className="w-5 h-5 text-white" />
                    </a>
                    <a
                        href="https://tiktok.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#2c52a4] p-2 rounded-full hover:scale-105 transition-transform"
                    >
                        <Music2 className="w-5 h-5 text-white" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
