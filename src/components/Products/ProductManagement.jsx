import React, { useState, useEffect } from "react";
import styles from "./ProductManagement.module.scss";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    articleNo: "",
    productName: "",
    price: "",
    inPrice: "",
    unit: "",
    description: "",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://prod-handler.onrender.com/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();

      setProducts(data.products || []);
      if (data.error) {
        setError(data.error);
      } else {
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete product");

        fetchProducts();
      } catch (err) {
        alert("Failed to delete product: " + err.message);
      }
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        inPrice: parseFloat(newProduct.inPrice)
      };

      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Failed to add product");
      
      setIsModalOpen(false);
      setNewProduct({
        articleNo: "",
        productName: "",
        price: "",
        inPrice: "",
        unit: "",
        description: "",
      });
      fetchProducts();
    } catch (err) {
      alert("Failed to add product: " + err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h2>Product Management</h2>
        <button
          className={styles.newProductBtn}
          style={{ marginLeft: "auto" }}
          onClick={() => setIsModalOpen(true)}
        >
          <span className={styles.buttonText}>Add Product</span>
          <span className={styles.plusIcon}>+</span>
        </button>
      </header>
      <main className={styles.content}>
        <div className={styles.productsContainer}>
          <div className={styles.headerRow}>
            <div className={styles.headerCell}>Article No.</div>
            <div className={styles.headerCell}>Product Name</div>
            <div className={styles.headerCell}>Price</div>
            <div className={styles.headerCell}>Description</div>
            <div className={styles.headerCell}>Actions</div>
          </div>
          <div className={styles.productsList}>
            {loading ? (
              <div className={styles.loading}>Loading products...</div>
            ) : products.length === 0 ? (
              <div className={styles.noProducts}>No products found.</div>
            ) : (
              products.map((product) => (
                <div key={product.id} className={styles.productRow}>
                  <div className={styles.articleCell}>{product.articleNo}</div>
                  <div className={styles.productCell}>
                    <span>{product.productName}</span>
                  </div>
                  <div className={styles.priceCell}>{product.price}</div>
                  <div className={styles.descriptionCell}>
                    <span>{product.description}</span>
                  </div>
                  <div className={styles.actionsCell}>
                    <button
                      className={styles.actionButton}
                      title="Delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Add New Product</h3>
              <button
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddProduct} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label htmlFor="articleNo">Article No.</label>
                <input
                  type="text"
                  id="articleNo"
                  name="articleNo"
                  value={newProduct.articleNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={newProduct.productName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="price">Selling Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="inPrice">Purchase Price</label>
                <input
                  type="number"
                  id="inPrice"
                  name="inPrice"
                  value={newProduct.inPrice}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="unit">Unit</label>
                <input
                  type="text"
                  id="unit"
                  name="unit"
                  value={newProduct.unit}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., pcs, kg, box"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton}>
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
