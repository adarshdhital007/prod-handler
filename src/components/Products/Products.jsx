import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import ProductSkeleton from "./ProductSkeleton";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchArticle, setSearchArticle] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  // Debounce function to prevent too many API calls
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        ...(searchArticle && { searchArticle }),
        ...(searchProduct && { searchProduct }),
      });

      const res = await fetch(`https://prod-handler.onrender.com/products?${queryParams}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();

      // Safely set the data with defaults
      setProducts(data.products || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalItems(data.pagination?.total || 0);

      // If we received an error message, set it
      if (data.error) {
        setError(data.error);
      } else {
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      setProducts([]);
      setTotalPages(1);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = debounce(() => {
    setCurrentPage(1);
    fetchProducts();
  }, 300);

  // Effect for search changes
  useEffect(() => {
    debouncedFetch();
  }, [searchArticle, searchProduct]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleContentClick = () => {
    if (sidebarOpen && window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const user = {
    name: "John Andre",
    company: "Storfjord AS",
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>

        {startPage > 1 && (
          <>
            <button
              className={styles.pageButton}
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
            {startPage > 2 && <span className={styles.pageEllipsis}>...</span>}
          </>
        )}

        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`${styles.pageButton} ${
              currentPage === number ? styles.active : ""
            }`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className={styles.pageEllipsis}>...</span>
            )}
            <button
              className={styles.pageButton}
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className={styles.pageButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>
    );
  };

  const renderSkeletons = () => {
    return Array(5)
      .fill(null)
      .map((_, index) => <ProductSkeleton key={index} />);
  };

  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.appContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div
          className={`${styles.hamburgerMenu} ${
            sidebarOpen ? styles.open : ""
          }`}
          onClick={toggleSidebar}
        >
          <div className={styles.hamburgerIcon}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtXVyIMR7o6upYXFIPCqIv8KkxyUJs0q3WzQ&s"
              alt="User avatar"
            />
          </div>
          <div className={styles.userDetails}>
            <div className={styles.userName}>{user.name}</div>
            <div className={styles.userCompany}>{user.company}</div>
          </div>
        </div>
        <div className={styles.language}>
          <span>Norsk Bokmål</span>
          <img
            src="https://storage.123fakturere.no/public/flags/SE.png"
            alt="Norwegian flag"
            className={styles.flag}
          />
        </div>
      </header>

      {/* Main content */}
      <div className={styles.mainContainer}>
        {/* Sidebar */}
        <aside
          className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}
        >
          <div className={styles.menuTitle}>Menu</div>
          <nav className={styles.menu}>
            <ul>
              <li className={styles.menuItem}>
                <span className={styles.icon}>📑</span>
                <span>Invoices</span>
              </li>
              <li className={styles.menuItem}>
                <span className={styles.icon}>👤</span>
                <span>Customers</span>
              </li>
              <li className={styles.menuItem}>
                <span className={styles.icon}>⚙️</span>
                <span>My Business</span>
              </li>
              <li className={styles.menuItem}>
                <span className={styles.icon}>📊</span>
                <span>Invoice Journal</span>
              </li>
              <li className={`${styles.menuItem} ${styles.active}`}>
                <span className={styles.icon}>💰</span>
                <span>Price List</span>
              </li>
              <li className={styles.menuItem}>
                <span className={styles.icon}>📋</span>
                <span>Multiple Invoicing</span>
              </li>
              <li className={styles.menuItem}>
                <span className={styles.icon}>🚫</span>
                <span>Unpaid Invoices</span>
              </li>
              <li className={styles.menuItem}>
                <span className={styles.icon}>📝</span>
                <span>Offer</span>
              </li>
              <li className={styles.menuItem}>
                <span className={styles.icon}>📦</span>
                <span>Inventory Control</span>
              </li>
              <li className={styles.menuItem}>
                <span className={styles.icon}>🧑‍🤝‍🧑</span>
                <span>Member Invoicing</span>
              </li>
              <li className={styles.menuItem}>
                <span className={styles.icon}>☁️</span>
                <span>Import/Export</span>
              </li>
              <li className={styles.menuItem}>
                <span className={styles.icon}>🚪</span>
                <span>Log out</span>
              </li>
            </ul>
          </nav>
        </aside>

        {sidebarOpen && (
          <div className={styles.overlay} onClick={toggleSidebar}></div>
        )}

        <main className={styles.content} onClick={handleContentClick}>
          <div className={styles.controls}>
            <div className={styles.searchArea}>
              <div className={styles.searchBox}>
                <input
                  type="text"
                  placeholder="Search Article No..."
                  value={searchArticle}
                  onChange={(e) => setSearchArticle(e.target.value)}
                />
                <button className={styles.searchButton}>🔍</button>
              </div>
              <div className={styles.searchBox}>
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                />
                <button className={styles.searchButton}>🔍</button>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.newProductBtn}>
                <span className={styles.buttonText}>New Product</span>
                <span className={styles.plusIcon}>+</span>
              </button>
              <button className={styles.printListBtn}>
                <span className={styles.buttonText}>Print List</span>
                <span className={styles.printerIcon}>🖨️</span>
              </button>
              <div className={styles.modeToggle}>
                <span className={styles.toggleText}>Advanced mode</span>
                <div className={styles.toggleSwitch}>
                  <div className={styles.toggleKnob}></div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.productsContainer}>
            <div className={styles.headerRow}>
              <div className={styles.headerCell}></div>
              <div className={styles.headerCell}>
                Article No. <span className={styles.sortArrow}>↓</span>
              </div>
              <div className={styles.headerCell}>
                Product/Service <span className={styles.sortArrow}>↓</span>
              </div>
              <div className={styles.headerCell}>In Price</div>
              <div className={styles.headerCell}>Price</div>
              <div className={styles.headerCell}>Unit</div>
              <div className={styles.headerCell}>In Stock</div>
              <div className={styles.headerCell}>Description</div>
              <div className={styles.headerCell}></div>
            </div>

            <div className={styles.productsList}>
              {loading ? (
                renderSkeletons()
              ) : error ? (
                <div className={styles.error}>{error}</div>
              ) : products.length === 0 ? (
                <div className={styles.noProducts}>No products found</div>
              ) : (
                products.map((product) => (
                  <div key={product.id} className={styles.productRow}>
                    <div className={styles.arrowCell}>→</div>
                    <div className={styles.articleCell}>
                      {product.articleNo}
                    </div>
                    <div className={styles.productCell}>
                      <span>{product.productName}</span>
                    </div>
                    <div className={styles.inPriceCell}>{product.inPrice}</div>
                    <div className={styles.priceCell}>{product.price}</div>
                    <div className={styles.unitCell}>{product.unit}</div>
                    <div className={styles.stockCell}>{product.inStock}</div>
                    <div className={styles.descriptionCell}>
                      {product.description}
                    </div>
                    <div className={styles.actionsCell}>⋯</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {renderPagination()}
        </main>
      </div>
    </div>
  );
}
