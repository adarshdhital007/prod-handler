import styles from "./Terms.module.scss";
import { useLanguage } from "../../context/LanguageContext";
import Navigation from "../Navigation/Navigation";

const Terms = () => {
  const { terms, isLoading, error } = useLanguage();

  return (
    <div className={styles.termsContainer}>
      <div className={styles.backgroundImage}>
        <img
          src="https://storage.123fakturera.se/public/wallpapers/sverige43.jpg"
          alt="Lett Faktura"
        />
      </div>
      <Navigation />
      <div className={styles.termsContentWrapper}>
        <a href="/" className={styles.closeButton}>
          Close and Go Back
        </a>
        <div className={styles.termsContent}>
          {isLoading && <div>Loading...</div>}
          {error && <div className={styles.error}>Error: {error}</div>}
          {!isLoading &&
            !error &&
            terms &&
            terms.content
              .split("\n")
              .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        <a href="/" className={styles.closeButton}>
          Close and Go Back
        </a>
      </div>
    </div>
  );
};

export default Terms;
