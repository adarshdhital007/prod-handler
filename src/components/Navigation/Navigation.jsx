import { useState, useEffect, useRef } from "react";
import styles from "./Navigation.module.scss";
import { useLanguage } from "../../context/LanguageContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguagePopoverOpen, setIsLanguagePopoverOpen] = useState(false);
  const languageSelectorRef = useRef(null);
  const { selectedLanguage, updateLanguage } = useLanguage();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Order", path: "/order" },
    { label: "Our Customers", path: "/customers" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/contact" },
  ];

  const getFlagUrl = (lang) => {
    return lang === "en"
      ? "https://storage.123fakturere.no/public/flags/GB.png"
      : "https://storage.123fakturere.no/public/flags/NO.png";
  };

  const getLanguageName = (lang) => {
    return lang === "en" ? "English" : "Norsk";
  };

  const handleLanguageSelect = async (lang) => {
    await updateLanguage(lang);
    setIsLanguagePopoverOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageSelectorRef.current && !languageSelectorRef.current.contains(event.target)) {
        setIsLanguagePopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.navigation}>
      <button
        className={styles.hamburger}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className={styles.logoContainer}>
        <img
          src="https://storage.123fakturera.se/public/icons/diamond.png"
          alt="Logo"
          className={styles.logo}
        />
      </div>

      <div className={styles.navContainer}>
        <div className={`${styles.navItems} ${isMenuOpen ? styles.open : ""}`}>
          {navItems.map((item) => (
            <a key={item.path} href={item.path} className={styles.navItem}>
              {item.label}
            </a>
          ))}
        </div>

        <div className={styles.languageSelector} ref={languageSelectorRef}>
          <button
            className={styles.languageButton}
            onClick={() => setIsLanguagePopoverOpen(!isLanguagePopoverOpen)}
          >
            <p>{getLanguageName(selectedLanguage)}</p>
            <img
              src={getFlagUrl(selectedLanguage)}
              alt={getLanguageName(selectedLanguage)}
              className={styles.flag}
            />
          </button>

          <div className={`${styles.languagePopover} ${isLanguagePopoverOpen ? styles.open : styles.close}`}>
            <button
              className={styles.languageOption}
              onClick={() => handleLanguageSelect("en")}
            >
              <span>English</span>
              <img
                src={getFlagUrl("en")}
                alt="English"
                className={styles.flag}
              />
            </button>
            <button
              className={styles.languageOption}
              onClick={() => handleLanguageSelect("no")}
            >
              <span>Norsk</span>
              <img
                src={getFlagUrl("no")}
                alt="Norsk"
                className={styles.flag}
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
