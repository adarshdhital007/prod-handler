import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Product = sequelize.define(
  "Product",
  {
    articleNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inStock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  }
);

export default Product;
