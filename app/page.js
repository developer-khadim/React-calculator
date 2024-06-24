"use client";
import React, { useState } from "react";

const Page = () => {
  const [display, setDisplay] = useState('0');
  const [ansdisplay, setAnsdisplay] = useState('=0');

  const buttons = [
    'e', 'μ', 'sin', 'deg',
    'AC', 'C', '/', '*',
    '7', '8', '9', '-',
    '4', '5', '6', '+',
    '1', '2', '3', '=',
    '0', '.'
  ];

  const handleClick = (value) => {
    setDisplay((prevDisplay) => {
      let newDisplay;
      switch (value) {
        case 'AC':
          setAnsdisplay('=0');
          return '0';
        case 'C':
          newDisplay = prevDisplay.slice(0, -1) || '0';
          setAnsdisplay('=0');
          return newDisplay;
        case '=':
          try {
            const result = eval(prevDisplay).toString();
            setAnsdisplay(result);
            return '0';
          } catch (error) {
            setAnsdisplay('Error');
            return '0';
          }
        case 'sin':
          newDisplay = Math.sin(parseFloat(prevDisplay)).toString();
          setAnsdisplay(newDisplay);
          return '0';
        case 'e':
          newDisplay = Math.E.toString();
          setAnsdisplay(newDisplay);
          return '0';
        case 'μ':
          newDisplay = (parseFloat(prevDisplay) * 1e-6).toString();
          setAnsdisplay(newDisplay);
          return '0';
        case 'deg':
          newDisplay = (parseFloat(prevDisplay) * (180 / Math.PI)).toString();
          setAnsdisplay(newDisplay);
          return '0';
        default:
          if (prevDisplay === '0' && value !== '.') {
            return value;
          } else {
            return prevDisplay + value;
          }
      }
    });
  };

  return (
    <>
      <div className="flex justify-center items-center h-[100vh] bg-gray-100">
        <div className="bg-black rounded-3xl p-4 w-72">
          <div className="flex flex-col justify-between mb-3">
            <div className="text-blue-500  bg-opacity-20 flex justify-between p-1 rounded">
              <h1 className="font-semibold" >Khadim Ali</h1>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <div className="w-70 flex flex-col justify-end mt-[30px] mb-[30px] ">
              <div className="text-white/70 text-right text-3xl font-light">{display}</div>
              <div className="text-white text-4xl text-right font-bold">{ansdisplay}</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn, index) => (
              <button
                key={index}
                className={`p-3 rounded-lg text-lg ${
                  ['e', 'μ', 'sin', 'deg'].includes(btn)
                    ? 'bg-gray-800 text-blue-400'
                    : ['AC', 'C'].includes(btn)
                    ? 'bg-gray-700 text-white'
                    : ['/', '*', '-', '+', '='].includes(btn)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-900 text-blue-400'
                } ${btn === '=' ? 'row-span-2' : ''} ${btn === '0' ? 'col-span-2' : ''}`}
                onClick={() => handleClick(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;