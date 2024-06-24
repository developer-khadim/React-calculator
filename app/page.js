"use client";
import React, { useState, useMemo } from "react";

const Page = () => {
  const [state, setState] = useState({
    display: "0",
    ansDisplay: "=0",
    isDarkMode: true,
  });

  const toggleDarkMode = () => {
    setState(prevState => ({ ...prevState, isDarkMode: !prevState.isDarkMode }));
  };

  const buttons = useMemo(() => [
    "e", "μ", "sin", "deg", "AC", "C", "/", "*",
    "7", "8", "9", "-", "4", "5", "6", "+",
    "1", "2", "3", "=", "0", "."
  ], []);

  const handleClick = (value) => {
    setState(prevState => {
      let newDisplay = prevState.display;
      let newAnsDisplay = prevState.ansDisplay;

      switch (value) {
        case "AC":
          newDisplay = "0";
          newAnsDisplay = "=0";
          break;
        case "C":
          newDisplay = prevState.display.slice(0, -1) || "0";
          newAnsDisplay = "=0";
          break;
        case "=":
          try {
            const result = eval(prevState.display).toString();
            newAnsDisplay = "=" + result;
            newDisplay = "0";
          } catch (error) {
            newAnsDisplay = "Error";
            newDisplay = "0";
          }
          break;
        case "sin":
          newAnsDisplay = "=" + Math.sin(parseFloat(prevState.display)).toString();
          newDisplay = "0";
          break;
        case "e":
          newAnsDisplay = "=" + Math.E.toString();
          newDisplay = "0";
          break;
        case "μ":
          newAnsDisplay = "=" + (parseFloat(prevState.display) * 1e-6).toString();
          newDisplay = "0";
          break;
        case "deg":
          newAnsDisplay = "=" + (parseFloat(prevState.display) * (180 / Math.PI)).toString();
          newDisplay = "0";
          break;
        default:
          if (prevState.display === "0" && value !== ".") {
            newDisplay = value;
          } else {
            newDisplay = prevState.display + value;
          }
      }

      return { ...prevState, display: newDisplay, ansDisplay: newAnsDisplay };
    });
  };

  return (
  <div className={`flex justify-center items-center h-screen ${state.isDarkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
  <div className={`rounded-3xl p-4 w-72 ${state.isDarkMode ? 'bg-gray-900' : 'bg-white/50'}`}>
        <div className="flex flex-col justify-between mb-3">
          <div className="text-blue-500 bg-opacity-20 flex justify-between p-1 rounded">
            <h1 className="font-semibold">Khadim Ali</h1>
            <svg
              onClick={toggleDarkMode}
              className=" hover:text-red-400 w-5 h-5 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </div>
          <div className="w-70 flex flex-col justify-end mt-[30px] mb-[30px] border-2 border-[#111827] rounded-xl px-2 py-2">
            <div className={`text-right text-3xl font-light ${state.isDarkMode ? 'text-white/60  ' : 'text-black/70  '}`}>
              {state.display}
            </div>
            <div className="text-4xl text-right font-bold">
              {state.ansDisplay}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className={`p-3 rounded-lg hover:bg-blue-500 hover:text-white text-lg ${
                ["e", "μ", "sin", "deg"].includes(btn)
                  ? "bg-gray-800 text-blue-400"
                  : ["AC", "C"].includes(btn)
                  ? "bg-gray-700 text-white"
                  : ["/", "*", "-", "+", "="].includes(btn)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-900 text-blue-400"
              } ${btn === "=" ? "row-span-2" : ""} ${
                btn === "0" ? "col-span-2" : ""
              }`}
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;