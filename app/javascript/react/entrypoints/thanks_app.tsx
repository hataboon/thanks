import React from "react";
import { createRoot } from "react-dom/client";
import Thanks from "../features/thanks";
import Header from "../components/Header";  // Headerをインポート
import { BrowserRouter as Router } from "react-router-dom"

const App = () => (
  <Router>
    <div className="min-h-screen bg-gray-100">
      <Header />  {/* ヘッダーを追加 */}
      <main className="container mx-auto mt-6 px-4">
        <Thanks />
      </main>
    </div>
  </Router>
);

let root: any;

const renderApp = () => {
  const container = document.getElementById("thanks_app");
  if (container) {
    if (!root) {
      console.log("Container found, rendering React app");
      root = createRoot(container);
      root.render(<App />);
    } else {
      console.log("React app already rendered, updating");
      root.render(<App />);
    }
  } else {
    console.log("Container not found");
  }
};

document.addEventListener('turbo:load', renderApp);
document.addEventListener('turbo:render', renderApp);