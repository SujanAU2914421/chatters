'use client';

import React, { createContext, useState, useContext } from 'react';

// Create the context
export const MainContext = createContext();

// Create the provider component
export default function MainContextProvider({ children }) {
  // State that will be shared in the context
  // const storedUserId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

  const [allUsersStatus, setAllUsersStatus] = useState(false);
  const [usersDetails, setUsersDetails] = useState();
  const [loading, setLoading] = useState(true);

  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Track sidebar visibility

  return (
    <MainContext.Provider
      value={{
        allUsersStatus,
        setAllUsersStatus,
        usersDetails,
        setUsersDetails,
        loading,
        setLoading,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

// Custom hook to use the context
export const useMainContext = () => {
  return useContext(MainContext);
};
