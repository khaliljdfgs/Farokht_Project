// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./pages";
import { SharedLayout, Home, User, Item } from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/" element={<SharedLayout />}>
          <Route index path="dashboard" element={<Home />} />
          <Route path="user" element={<User />} />
          <Route path="item" element={<Item />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
