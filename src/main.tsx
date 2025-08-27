import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { HashRouter as Router, Routes } from 'react-router';
import { DataContext } from './DataContext';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Header } from './uicomponents/Header';
import { Route } from 'react-router';
import { App } from './App';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);
ModuleRegistry.registerModules([AllCommunityModule]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConvexProvider client={convex}>
    <Header />
    <Router>
      <StrictMode>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
        <DataContext />
      </StrictMode>
    </Router>
  </ConvexProvider>
);
