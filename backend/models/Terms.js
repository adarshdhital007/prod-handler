import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Terms = sequelize.define(
  "Terms",
  {
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    timestamps: true,
  }
);

export default Terms; 