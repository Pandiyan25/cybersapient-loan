import { Routes, Route } from "react-router-dom";
import Chats from "./components/chats";
import React, { useState } from "react";
import Loan from "./components/loan";
import Employment from "./components/employment";
import DocumentCollection from "./components/documentCollection";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Chats />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/employment" element={<Employment />} />
        <Route path="/documentCollection" element={<DocumentCollection />} />
      </Routes>
    </div>
  );
}

export default App;
