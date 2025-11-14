import { Sidebar } from "./Sidebar";

export function Layout({ children, showSidebar = false, onCloseSidebar }) {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Mobile Sidebar Overlay - Only show on mobile */}
            {showSidebar && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={onCloseSidebar}
                        aria-hidden="true"
                    />
                    <div className="fixed left-0 top-0 h-full w-[390px] max-w-[90vw] z-50">
                        <Sidebar onClose={onCloseSidebar} />
                    </div>
                </>
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-auto h-full w-full">
                {children}
            </main>
        </div>
    );
}