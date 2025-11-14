import { Link } from "react-router-dom";
import { X } from "lucide-react";
import {
    Home,
    Person as User,
    ShoppingBag,
    Language as Globe,
    AttachMoney as DollarSign
} from "@mui/icons-material";

export function Sidebar({ onClose }) {
    return (
        <div className="bg-[#f6f6f6] box-border content-stretch flex flex-col items-start relative shadow-[0px_0px_21px_2.1px_rgba(159,159,159,0.18)] h-full w-full max-w-[390px]">
            {/* Header */}
            <div className="bg-[#ffe600] h-[60px] relative rounded-bl-[16px] rounded-br-[16px] shrink-0 w-full">
                <div className="size-full">
                    <div className="box-border content-stretch flex h-[60px] items-start justify-between px-[20px] py-0 relative w-full">
                        {/* Profile Section */}
                        <div className="box-border content-stretch flex flex-col h-full items-start justify-center px-0 py-[6px] relative shrink-0">
                            <div className="content-stretch flex h-[48px] items-start relative shrink-0">
                                <div className="max-w-[136.34px] relative shrink-0 size-[48px] bg-gray-300 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-gray-600" />
                                </div>
                                <div className="box-border content-stretch flex flex-col h-full items-start justify-center px-[10px] py-[13px] relative shrink-0">
                                    <div className="content-stretch flex flex-col h-[22px] items-start relative shrink-0">
                                        <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-black text-nowrap">
                                            <p className="leading-[normal] whitespace-pre">Hi, Guest</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Close Button */}
                        <div className="box-border content-stretch flex flex-col h-[60px] items-start justify-center px-0 py-[12px] relative shrink-0 w-[36px]">
                            <button
                                onClick={onClose}
                                className="bg-[rgba(91,83,83,0.4)] box-border content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[18px] shrink-0 size-[36px] border border-solid border-white cursor-pointer hover:bg-[rgba(91,83,83,0.6)] transition-colors"
                                aria-label="Close sidebar"
                            >
                                <X className="size-[20px] text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="content-stretch flex flex-col gap-[16px] h-full items-center overflow-auto relative shrink-0 w-full">
                {/* Navigation */}
                <div className="box-border content-stretch flex flex-col items-center pb-0 pt-[20px] px-0 relative shrink-0 w-full">
                    {/* Login/Register Button */}
                    <div className="box-border content-stretch flex h-[72px] items-center justify-center pb-[24px] pt-[23px] px-0 relative rounded-[56px] shrink-0 w-[350px]">
                        <Link
                            to="/login"
                            onClick={onClose}
                            className="flex flex-col justify-center leading-[0] relative shrink-0 text-black text-center text-nowrap tracking-[-0.249px] hover:text-[#00a8e3] transition-colors"
                        >
                            <p className="cursor-pointer leading-[25px] whitespace-pre">Login / Register</p>
                        </Link>
                    </div>

                    {/* Menu Items Container */}
                    <div className="box-border content-stretch flex flex-col items-start overflow-clip pb-0 pt-[20px] px-0 relative shrink-0 w-full">
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                            {/* Switch to DreamDubai */}
                            <div className="relative shrink-0 w-full border-b border-[#e6e6e6]">
                                <div className="box-border content-stretch flex flex-col items-start pb-[21px] pt-0 px-[20px] relative w-full">
                                    <div className="min-h-[70px] relative rounded-[22px] shrink-0 w-full bg-gradient-to-r from-[#00a8e3] to-[#0095ca]">
                                        <div className="flex flex-row items-center min-h-inherit size-full">
                                            <div className="box-border content-stretch flex items-center min-h-inherit px-[20px] py-[10px] relative w-full">
                                                <div className="h-[35px] relative shrink-0 w-[33px] flex items-center justify-center">
                                                    <ShoppingBag className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="box-border content-stretch flex flex-col items-start justify-center pl-[10px] pr-0 py-[19px] relative shrink-0">
                                                    <div className="content-stretch flex flex-col items-center relative shrink-0">
                                                        <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-center text-nowrap text-white tracking-[-0.39px]">
                                                            <p className="leading-[12px] whitespace-pre">Switch to DreamDubai</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Home */}
                            <div className="box-border content-stretch flex flex-col items-start pb-px pt-0 px-0 relative shrink-0 w-full border-b border-[#e6e6e6]">
                                <Link
                                    to="/"
                                    onClick={onClose}
                                    className="cursor-pointer min-h-[70px] relative shrink-0 w-full hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex flex-row items-center min-h-inherit size-full">
                                        <div className="box-border content-stretch flex items-center min-h-inherit px-[20px] py-[10px] relative w-full">
                                            <div className="box-border content-stretch flex flex-col h-[51px] items-center justify-center max-w-[400px] pl-0 pr-[10px] py-0 relative shrink-0 w-[61px]">
                                                <div className="relative rounded-[25.5px] shrink-0 size-[51px] bg-[#00a8e3] flex items-center justify-center">
                                                    <Home className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#1e1e1e] text-center text-nowrap tracking-[-0.39px]">
                                                <p className="cursor-pointer leading-[16px] whitespace-pre">Home</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Women */}
                            <div className="box-border content-stretch flex flex-col items-start pb-px pt-0 px-0 relative shrink-0 w-full border-b border-[#e6e6e6]">
                                <Link
                                    to="/women"
                                    onClick={onClose}
                                    className="min-h-[70px] relative shrink-0 w-full hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    <div className="flex flex-row items-center min-h-inherit size-full">
                                        <div className="box-border content-stretch flex items-center min-h-inherit px-[20px] py-[10px] relative w-full">
                                            <div className="box-border content-stretch flex flex-col h-[51px] items-center justify-center max-w-[400px] pl-0 pr-[10px] py-0 relative shrink-0 w-[61px]">
                                                <div className="relative rounded-[25.5px] shrink-0 size-[51px] bg-pink-500 flex items-center justify-center">
                                                    <User className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#1e1e1e] text-center text-nowrap tracking-[-0.39px]">
                                                <p className="cursor-pointer leading-[16px] whitespace-pre">Women</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Men */}
                            <div className="box-border content-stretch flex flex-col items-start pb-px pt-0 px-0 relative shrink-0 w-full border-b border-[#e6e6e6]">
                                <Link
                                    to="/men"
                                    onClick={onClose}
                                    className="min-h-[70px] relative shrink-0 w-full hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    <div className="flex flex-row items-center min-h-inherit size-full">
                                        <div className="box-border content-stretch flex items-center min-h-inherit px-[20px] py-[10px] relative w-full">
                                            <div className="box-border content-stretch flex flex-col h-[51px] items-center justify-center max-w-[400px] pl-0 pr-[10px] py-0 relative shrink-0 w-[61px]">
                                                <div className="relative rounded-[25.5px] shrink-0 size-[51px] bg-blue-500 flex items-center justify-center">
                                                    <User className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#1e1e1e] text-center text-nowrap tracking-[-0.39px]">
                                                <p className="cursor-pointer leading-[16px] whitespace-pre">Men</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Kids */}
                            <div className="box-border content-stretch flex flex-col items-start pb-px pt-0 px-0 relative shrink-0 w-full border-b border-[#e6e6e6]">
                                <Link
                                    to="/kids"
                                    onClick={onClose}
                                    className="min-h-[70px] relative shrink-0 w-full hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    <div className="flex flex-row items-center min-h-inherit size-full">
                                        <div className="box-border content-stretch flex items-center min-h-inherit px-[20px] py-[10px] relative w-full">
                                            <div className="box-border content-stretch flex flex-col h-[51px] items-center justify-center max-w-[400px] pl-0 pr-[10px] py-0 relative shrink-0 w-[61px]">
                                                <div className="relative rounded-[25.5px] shrink-0 size-[51px] bg-green-500 flex items-center justify-center">
                                                    <User className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#1e1e1e] text-center text-nowrap tracking-[-0.39px]">
                                                <p className="cursor-pointer leading-[16px] whitespace-pre">Kids</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Stationery */}
                            <div className="box-border content-stretch flex flex-col items-start pb-px pt-0 px-0 relative shrink-0 w-full border-b border-[#e6e6e6]">
                                <Link
                                    to="/stationery"
                                    onClick={onClose}
                                    className="cursor-pointer min-h-[70px] relative shrink-0 w-full hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex flex-row items-center min-h-inherit size-full">
                                        <div className="box-border content-stretch flex items-center min-h-inherit px-[20px] py-[10px] relative w-full">
                                            <div className="box-border content-stretch flex flex-col h-[51px] items-center justify-center max-w-[400px] pl-0 pr-[10px] py-0 relative shrink-0 w-[61px]">
                                                <div className="relative rounded-[25.5px] shrink-0 size-[51px] bg-purple-500 flex items-center justify-center">
                                                    <ShoppingBag className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#1e1e1e] text-center text-nowrap tracking-[-0.39px]">
                                                <p className="cursor-pointer leading-[16px] whitespace-pre">Stationery</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Download App Section */}
                <div className="h-[78px] relative shrink-0 w-[350px] flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-black">Download our app</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 w-[390px]">
                <div className="box-border content-stretch flex flex-col items-start pb-[10px] pt-0 px-0 relative shrink-0 w-full">
                    {/* Currency Section */}
                    <div className="bg-[#00a8e3] h-[69px] max-h-[69px] mb-[-10px] relative rounded-tl-[12px] rounded-tr-[12px] shrink-0 w-full">
                        <div className="flex flex-col justify-center max-h-inherit overflow-x-auto overflow-y-clip size-full">
                            <div className="box-border content-stretch flex flex-col h-[69px] items-start justify-center max-h-inherit px-[20px] py-0 relative w-full">
                                <div className="basis-0 content-stretch flex grow items-start justify-between min-h-px min-w-px relative shrink-0 w-full">
                                    <div className="box-border content-stretch flex flex-col h-full items-start justify-center px-0 py-[23px] relative shrink-0">
                                        <div className="content-stretch flex h-[23px] items-center gap-2 relative shrink-0">
                                            <DollarSign className="w-5 h-5 text-white" />
                                            <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-nowrap text-white">
                                                <p className="leading-[normal] whitespace-pre">Currency</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-border content-stretch flex flex-col h-full items-start justify-center px-0 py-[23.5px] relative shrink-0">
                                        <div className="content-stretch flex h-[22px] items-start gap-2 relative shrink-0">
                                            <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-nowrap text-white">
                                                <p className="leading-[normal] whitespace-pre">AED</p>
                                            </div>
                                            <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-nowrap text-white">
                                                <p className="underline cursor-pointer hover:opacity-80 leading-[normal] whitespace-pre">Change</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Language Section */}
                    <div className="bg-[#2c52a4] h-[69px] max-h-[69px] mb-[-10px] relative rounded-tl-[12px] rounded-tr-[12px] shrink-0 w-full">
                        <div className="flex flex-col justify-center max-h-inherit size-full">
                            <div className="box-border content-stretch flex flex-col h-[69px] items-start justify-center max-h-inherit px-[20px] py-0 relative w-full">
                                <div className="basis-0 content-stretch flex grow items-start justify-between min-h-px min-w-px relative shrink-0 w-full">
                                    <div className="box-border content-stretch flex flex-col h-full items-start justify-center px-0 py-[23px] relative shrink-0">
                                        <div className="content-stretch flex h-[23px] items-center gap-2 relative shrink-0">
                                            <Globe className="w-5 h-5 text-white" />
                                            <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-nowrap text-white">
                                                <p className="leading-[normal] whitespace-pre">Language</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-border content-stretch flex flex-col h-full items-start justify-center px-0 py-[23.5px] relative shrink-0">
                                        <div className="content-stretch flex h-[22px] items-start gap-2 relative shrink-0">
                                            <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-nowrap text-white">
                                                <p className="leading-[normal] whitespace-pre">English</p>
                                            </div>
                                            <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-nowrap text-white">
                                                <p className="underline cursor-pointer hover:opacity-80 leading-[normal] whitespace-pre">Change</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}