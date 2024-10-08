import { createContext, useState } from "react";

export const ResultContext = createContext();

const ResultProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [results, setResults] = useState({
    query: null,
    items: null,
  });

  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <ResultContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        results,
        setResults,
        showResults,
        setShowResults,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export default ResultProvider;
