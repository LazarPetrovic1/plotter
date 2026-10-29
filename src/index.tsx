import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GraphPlotProvider } from './contexts/GraphPlotContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GraphPlotProvider>
      <App />
    </GraphPlotProvider>
  </React.StrictMode>
);