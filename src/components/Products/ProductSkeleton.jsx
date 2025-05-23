import styles from './Products.module.scss';

const ProductSkeleton = () => {
  return (
    <div className={styles.productRow}>
      <div className={styles.arrowCell}>
        <div className={styles.skeleton} style={{ width: '20px', height: '20px' }} />
      </div>
      <div className={styles.articleCell}>
        <div className={styles.skeleton} style={{ width: '80px', height: '24px' }} />
      </div>
      <div className={styles.productCell}>
        <div className={styles.skeleton} style={{ width: '100%', height: '24px' }} />
      </div>
      <div className={styles.inPriceCell}>
        <div className={styles.skeleton} style={{ width: '60px', height: '24px' }} />
      </div>
      <div className={styles.priceCell}>
        <div className={styles.skeleton} style={{ width: '60px', height: '24px' }} />
      </div>
      <div className={styles.unitCell}>
        <div className={styles.skeleton} style={{ width: '40px', height: '24px' }} />
      </div>
      <div className={styles.stockCell}>
        <div className={styles.skeleton} style={{ width: '40px', height: '24px' }} />
      </div>
      <div className={styles.descriptionCell}>
        <div className={styles.skeleton} style={{ width: '100%', height: '24px' }} />
      </div>
      <div className={styles.actionsCell}>
        <div className={styles.skeleton} style={{ width: '20px', height: '20px' }} />
      </div>
    </div>
  );
};

export default ProductSkeleton; 