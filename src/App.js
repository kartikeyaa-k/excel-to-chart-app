import React from 'react';
import LineChartWithUpload from './components/LineChartWithUpload';
import './styles/App.css';

/**
 * Main application component that renders the LineChartWithUpload component.
 *
 * @component
 * @example
 * return (
 *   <App />
 * );
 */
function App() {
  return (
    <div className="container">
      <header>
        <h1>Excel Data to Line Chart</h1>
      </header>
      <main>
        <LineChartWithUpload />
      </main>
    </div>
  );
}

export default App;
