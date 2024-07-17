import React, { useEffect } from 'react';
import WeatherForecast from './components/WeatherForecast';
import ContactForm from './components/ContactForm';

function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="App">
      <header className="bg-[#267491] text-gray-300 p-4 text-center">
        <h1 className="text-6xl font-bold inline border-b-4 border-red-600 text-gray-300'">Weekly Weather Forecast</h1>
        <div className='p-3'></div>
        <p className='font-bold text-3xl'>Enter a city below to find its weather forecast.</p>
      </header>
      <main className="p-5">
        <WeatherForecast />
        <ContactForm />
      </main>
    </div>
  );
}

export default App;
