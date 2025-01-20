import Header from "./global/Header";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

const SharedLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
};

export default SharedLayout;