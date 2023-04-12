import React, { useState } from "react";
import styles from "./BillingForm.module.css"

const BillingForm = () => {
  // State for customer name input
  const [customerName, setCustomerName] = useState("");

  // State for product selection
  const [products, setProducts] = useState([]);

  // State for adding new products
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: 0,
  });

  // State for showing the bill
  const [showBill, setShowBill] = useState(false);

  // Handle customer name input change
  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  // Handle product name input change
  const handleProductNameChange = (event) => {
    setNewProduct({ ...newProduct, name: event.target.value });
  };

  // Handle product quantity input change
  const handleProductQuantityChange = (event) => {
    setNewProduct({ ...newProduct, quantity: parseInt(event.target.value) });
  };

  // Handle adding a new product
  const handleAddProduct = () => {
    if (newProduct.name !== "" && newProduct.quantity !== 0) {
      setProducts([...products, newProduct]);
      setNewProduct({
        name: "",
        quantity: 0,
      });
    }
  };

  // Handle creating the bill
  const handleCreateBill = () => {
    // Set showBill to true
    setShowBill(true);
  };

  // Function to get the price of a product

  const getProductPrice = (productName) => {
    switch (productName) {
      case "Maggi":
        return 10;
      case "Colddrink":
        return 20;
      case "Coffee":
        return 10;
      case "Sugar":
        return 20;
      case "Milk":
        return 18;
      default:
        return 0;
    }
  };

  return (
    <div>
      <section>
        <h2>Section 1: Customer Name</h2>
        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={handleCustomerNameChange}
        />
      </section>
      <section>
        <h2>Section 2: Product Selection</h2>
        {products.map((product, index) => (
          <div key={index}>
            <p>
              {product.name}: {product.quantity} x ₹
              {getProductPrice(product.name)} = ₹
              {(product.quantity * getProductPrice(product.name)).toFixed(2)}
            </p>
          </div>
        ))}

        <div>
          <label htmlFor="productName">Product:</label>
          <select
            id="productName"
            value={newProduct.name}
            onChange={handleProductNameChange}
          >
            <option value="">Select a product</option>
            <option value="Maggi">Maggi</option>
            <option value="Colddrink">Colddrink</option>
            <option value="Coffee">Coffee</option>
            <option value="Sugar">Sugar</option>
            <option value="Milk">Milk</option>
          </select>
          <label htmlFor="productQuantity">Quantity:</label>
          <input
            type="number"
            id="productQuantity"
            value={newProduct.quantity}
            onChange={handleProductQuantityChange}  
          />
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
      </section>
      <section>
  <h2>Section 3: Bill Creation</h2>
  <button onClick={handleCreateBill}>Create Bill</button>
  {showBill && (
    <div>
      <h3>Bill for {customerName}:</h3>
      <table className={styles["bill-table"]}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>₹{getProductPrice(product.name)}</td>
              <td>{product.quantity}</td>
              <td>₹{(product.quantity * getProductPrice(product.name)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>
        Total: ₹
        {products
          .reduce(
            (acc, curr) =>
              acc + curr.quantity * getProductPrice(curr.name),
            0
          )
          .toFixed(2)}
      </h3>
    </div>
  )}
</section>
    </div>
  );
};

export default BillingForm;
