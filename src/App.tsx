import { BrowserRouter, Route, Routes } from "react-router-dom";



import Clock from "./pages/Clock"
import NotFound from "./NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Clock />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}