import React from "react";
import '@testing-library/jest-dom'

import { render, fireEvent, waitFor, screen, cleanup } from "@testing-library/react";
import {Button} from "@mui/material";
import AnimeListPage from "../pages/AnimeListPage";

test("<AnimeListPage />", () => {
    render(<AnimeListPage />);
    const buttonText = screen.getByText(/Trending Anime/);
    expect(buttonText).toBeInTheDocument();
})