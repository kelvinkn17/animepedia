import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoadingPage from "./pages/LoadingPage";

const Main = () => {
    return(
        <React.Suspense fallback={<LoadingPage />}>
            <Routes>
                <Route path='/' element={<AnimeListPage />} />
                <Route path='/anime/:id' element={<AnimeDetailPage />} />
                <Route path='/mycollections' element={<MyCollectionsPage />} />

                <Route
                    path="*" element={<Navigate to="/" />}
                />
            </Routes>
        </React.Suspense>
    )
}

const AnimeListPage = React.lazy(() => import('./pages/AnimeListPage'));
const MyCollectionsPage = React.lazy(() => import('./pages/MyCollectionsPage'));
const AnimeDetailPage = React.lazy(() => import('./pages/AnimeDetailPage'));

export default Main;