import styles from "./Terms.module.scss";
import { useLanguage } from "../../context/LanguageContext";
import Navigation from "../Navigation/Navigation";

const Terms = () => {
  const { terms, isLoading, error } = useLanguage();

  return (
    <div className={styles.termsContainer}>
      <Navigation />
      <div className={styles.termsContainerInner}>
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
