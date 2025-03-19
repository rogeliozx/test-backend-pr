import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import MoviesContainer from "./pages/MoviesContainer";
import { Route, Routes } from "react-router-dom";
import MoviesDetailContainer from "./pages/MoviesDetailContainer";
import SeatSelection from "./pages/SeatSelection";
import "./styles/global.css"
import ConfirmedBuy from "./pages/ConfirmedTicket";

function App() { 
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<MoviesContainer />} />
          <Route path="/movies/:id" element={<MoviesDetailContainer />} />
          <Route path="/ticket" element={<MoviesDetailContainer />} />
          <Route path="/seats" element={<SeatSelection />} />
          <Route path="/confirmed" element={<ConfirmedBuy />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
