import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useCart } from "../context/CartContext";
import { Close, Add, Remove, LocalShipping, Home } from "@mui/icons-material";

export function CheckoutPage({ onMenuClick }) {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, updateQuantity, removeFromCart } = useCart();
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [countryCode, setCountryCode] = useState("+971");
    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        country: "United Arab Emirates"
    });

    const subtotal = getCartTotal();
    const shipping = subtotal > 200 ? 0 : 25;
    const total = subtotal + shipping;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveAddress = (e) => {
        e.preventDefault();
        const addressWithCountryCode = {
            ...formData,
            mobile: `${countryCode} ${formData.mobile}`
        };
        setShippingAddress(addressWithCountryCode);
        setShowAddressModal(false);
    };

    const handleEditAddress = () => {
        setShowAddressModal(true);
    };

    const handlePlaceOrder = () => {
        if (!shippingAddress) {
            alert("Please add a shipping address");
            return;
        }
        // Place order logic here
        alert("Order placed successfully!");
        navigate("/");
    };

    if (cartItems.length === 0) {
        navigate("/cart");
        return null;
    }

    return (
        <div className="bg-white min-h-screen w-full">
            <Header onMenuClick={onMenuClick} />

            <main className="max-w-[1400px] mx-auto px-6 py-10">

                {/* Title */}
                <h1 className="text-3xl font-bold mb-10">Complete your Order</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* LEFT SECTION */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* ITEM SUMMARY */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">Item Summary</h2>

                                <button
                                    onClick={() => navigate("/cart")}
                                    className="flex items-center gap-2 bg-[#EAF5FF] text-[#1273EA] px-5 py-2 rounded-full font-semibold text-sm">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 00-2.97 0L4.5 13.88V19.5h5.62l9.392-9.392a2.1 2.1 0 000-2.97l-2.65-2.65z" />
                                    </svg>
                                    Edit
                                </button>
                            </div>

                            <div className="space-y-10">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex items-center gap-5">

                                        {/* IMAGE */}
                                        <div className="w-28 h-36 rounded-xl overflow-hidden bg-gray-100">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {/* DETAILS */}
                                        <div className="flex-1">
                                            <h3 className="font-medium text-lg">{item.name}</h3>
                                            <p className="font-medium mt-1">{item.currency}{item.price.toFixed(2)}</p>
                                        </div>

                                        {/* QTY + COLOR/SIZE */}
                                        <div className="flex flex-col items-end gap-3">
                                            <span className="text-sm font-semibold">Qty. {item.quantity}</span>

                                            <div className="flex items-center gap-3">

                                                {/* COLOR CIRCLE */}
                                                <div
                                                    className="w-8 h-8 rounded-full border border-gray-300"
                                                    style={{ background: item.colorHex }}
                                                ></div>

                                                {/* SIZE */}
                                                <div className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-semibold">
                                                    {item.size}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <hr className="mt-10 border-gray-300" />
                        </div>

                        {/* DELIVERY */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Delivery</h2>

                            {shippingAddress ? (
                                <div className="border-2 border-gray-200 rounded-xl p-6 relative flex items-center gap-4">
                                    <div className="flex-shrink-0">
                                        <Home className="w-8 h-8 text-gray-600 " />
                                    </div>

                                    <div className="flex-1 pr-20">
                                        <p className="font-bold text-lg">
                                            {shippingAddress.fullName} | {shippingAddress.mobile}
                                        </p>
                                        <p className="font-normal text-lg">
                                            {shippingAddress.addressLine1}{shippingAddress.addressLine2 && `, ${shippingAddress.addressLine2}`}, {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}, {shippingAddress.country}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setShowAddressModal(true)}
                                        className="absolute top-4 right-4 flex items-center gap-2 bg-[#EAF5FF] text-[#1273EA] px-4 py-2 rounded-full font-semibold text-sm hover:bg-[#d5ebff] transition"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 00-2.97 0L4.5 13.88V19.5h5.62l9.392-9.392a2.1 2.1 0 000-2.97l-2.65-2.65z" />
                                        </svg>
                                        Edit
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowAddressModal(true)}
                                    className="w-full border-2 border-dashed border-[#0072E5] text-[#0072E5] py-4 rounded-xl font-semibold text-center hover:bg-[#EAF5FF] transition"
                                >
                                    + Add new shipping address
                                </button>
                            )}
                        </div>

                    </div>

                    {/* RIGHT SIDE PAYMENT SUMMARY */}
                    <div>
                        <div className="bg-gray-50 rounded-2xl p-6 sticky top-6">

                            <h2 className="text-xl font-bold mb-6">Payment Summary</h2>

                            <div className="space-y-3 text-gray-700">
                                <div className="flex justify-between">
                                    <span>Sub Total:</span>
                                    <span>AED{subtotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>VAT Amount:</span>
                                    <span>AED{(subtotal * 0.052).toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Delivery Fee:</span>
                                    <span>AED{shipping.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-300 mt-4 pt-4">
                                <div className="flex justify-between text-xl font-bold">
                                    <span>Grand Total:</span>
                                    <span>AED{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                className="w-full mt-6 bg-gradient-to-l from-[#FACC00] to-[#FFB800] py-4 rounded-full font-bold text-lg"
                            >
                                Continue
                            </button>
                        </div>
                    </div>

                </div>
            </main>


            {/* Add Address Modal */}
            {showAddressModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Add Shipping Address</h2>
                            <button
                                onClick={() => setShowAddressModal(false)}
                                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
                            >
                                <Close className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveAddress} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Mobile Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-3">
                                        <select
                                            value={countryCode}
                                            onChange={(e) => setCountryCode(e.target.value)}
                                            className="border border-gray-300 rounded-lg px-3 py-3 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="+971">+971</option>
                                            <option value="+91">+91</option>
                                            <option value="+1">+1</option>
                                            <option value="+44">+44</option>
                                            <option value="+966">+966</option>
                                            <option value="+974">+974</option>
                                        </select>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                            required
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="XX XXX XXXX"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Address Line 1 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="addressLine1"
                                        value={formData.addressLine1}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="House No., Building Name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Address Line 2
                                    </label>
                                    <input
                                        type="text"
                                        name="addressLine2"
                                        value={formData.addressLine2}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Road Name, Area"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">
                                            City <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Dubai"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2">
                                            State/Emirate <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Dubai"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">
                                            Pincode <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="000000"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2">
                                            Country <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            required
                                            disabled
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddressModal(false)}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-[#ffe600] rounded-full font-semibold hover:bg-[#f0d900] transition"
                                >
                                    Save Address
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
