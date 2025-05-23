import { createContext, useContext, useState, useEffect, useMemo } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [terms, setTerms] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTerms = async (lang) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`https://prod-handler.onrender.com/terms/${lang}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch terms: ${response.statusText}`);
      }
      
      const termsData = await response.json();
      setTerms(termsData);
    } catch (error) {
      console.error("Error fetching terms:", error);
      setError(error.message);
      if (!terms) {
        setTerms(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTerms(selectedLanguage);
  }, []);

  const updateLanguage = async (lang) => {
    if (lang === selectedLanguage) return;
    setSelectedLanguage(lang);
    await fetchTerms(lang);
  };

  return (
    <LanguageContext.Provider
      value={useMemo(() => ({
        selectedLanguage,
        terms,
        updateLanguage,
        isLoading,
        error,
      }), [selectedLanguage, terms, updateLanguage, isLoading, error])}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};
