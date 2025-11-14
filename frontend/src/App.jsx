import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { OTPPage } from "./components/OTPPage";
import { SignupPage } from "./components/SignupPage";
import { CartPage } from "./components/CartPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { ProductPage } from "./components/ProductPage";
import { MensPage } from "./components/MensPage";
import { WomenPage } from "./components/WomenPage";
import { KidsPage } from "./components/KidsPage";
import { StationeryPage } from "./components/StationeryPage";

export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <CartProvider>
            <Router>
                <Layout
                    showSidebar={isSidebarOpen}
                    onCloseSidebar={() => setIsSidebarOpen(false)}
                >
                    <Routes>
                        <Route path="/" element={<HomePage onMenuClick={() => setIsSidebarOpen(true)} />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/otp" element={<OTPPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/cart" element={<CartPage onMenuClick={() => setIsSidebarOpen(true)} />} />
                        <Route path="/checkout" element={<CheckoutPage onMenuClick={() => setIsSidebarOpen(true)} />} />
                        <Route path="/product/:id" element={<ProductPage onMenuClick={() => setIsSidebarOpen(true)} />} />
                        <Route path="/men" element={<MensPage onMenuClick={() => setIsSidebarOpen(true)} />} />
                        <Route path="/women" element={<WomenPage onMenuClick={() => setIsSidebarOpen(true)} />} />
                        <Route path="/kids" element={<KidsPage onMenuClick={() => setIsSidebarOpen(true)} />} />
                        <Route path="/stationery" element={<StationeryPage onMenuClick={() => setIsSidebarOpen(true)} />} />
                        <Route path="/preview_page.html" element={<Navigate to="/" replace />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Layout>
            </Router>
        </CartProvider>
    );
}