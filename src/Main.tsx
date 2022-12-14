import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoadingPage from "./pages/LoadingPage";
import ScrollToTop from "./hooks/ScrollToTop";

const Main = () => {
    return(
        <React.Suspense fallback={<LoadingPage />}>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Navigate to="/anime/trending/1"/>} />
                <Route path='/anime/trending/:page' element={<AnimeListPage />} />
                <Route path='/anime/:id' element={<AnimeDetailPage />} />
                <Route path='/mycollections' element={<MyCollectionsPage />} />
                <Route path='/mycollections/:id' element={<MyCollectionsDetailPage />} />

                <Route
                    path="*" element={<Navigate to="/anime/trending/1" />}
                />
            </Routes>
        </React.Suspense>
    )
}

const AnimeListPage = React.lazy(() => import('./pages/AnimeListPage'));
const AnimeDetailPage = React.lazy(() => import('./pages/AnimeDetailPage'));

const MyCollectionsPage = React.lazy(() => import('./pages/MyCollectionsPage'));
const MyCollectionsDetailPage = React.lazy(() => import('./pages/MyCollectionsDetailPage'));

export default Main;