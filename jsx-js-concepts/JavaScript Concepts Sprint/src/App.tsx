import React, { useState } from 'react';
import NumberList from './components/NumberList';
import FilterControls from './components/FilterControls';
import Logger from './components/Logger';
import HoistingDemo from './components/HoistingDemo';
import ConstructorDemo from './components/ConstructorDemo';
import { NumberItem } from './interfaces/NumberItem';

const App = () => {
  // State for numbers
  const [numbers, setNumbers] = useState<NumberItem[]>([
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>JSX and JavaScript Concepts Sprint</h1>
      <NumberList numbers={numbers} />
      <FilterControls numbers={numbers} setNumbers={setNumbers} />
      <Logger numbers={numbers} />
      <HoistingDemo />
      <ConstructorDemo />
    </div>
  );
};

export default App;
