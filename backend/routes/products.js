import Product from "../models/Product.js";
import { Op } from "sequelize";

async function productRoutes(fastify, options) {
  fastify.get("/products", async (request, reply) => {
    try {
      const page = parseInt(request.query.page) || 1;
      const limit = parseInt(request.query.limit) || 10;
      const offset = (page - 1) * limit;
      const searchArticle = request.query.searchArticle || "";
      const searchProduct = request.query.searchProduct || "";

      const whereClause = {};
      if (searchArticle) {
        whereClause.articleNo = {
          [Op.iLike]: `%${searchArticle}%`,
        };
      }
      if (searchProduct) {
        whereClause.productName = {
          [Op.iLike]: `%${searchProduct}%`,
        };
      }

      const totalCount = await Product.count({ where: whereClause });

      const products = await Product.findAll({
        where: whereClause,
        limit,
        offset,
        order: [["articleNo", "ASC"]],
      });

      const totalPages = Math.max(1, Math.ceil(totalCount / limit));
      const currentPage = Math.min(Math.max(1, page), totalPages);

      reply.send({
        products: products || [],
        pagination: {
          total: totalCount || 0,
          page: currentPage,
          limit: limit,
          totalPages: totalPages,
        },
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      reply.code(500).send({
        error: "Failed to fetch products",
        products: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      });
    }
  });

  fastify.get("/products/:id", async (request, reply) => {
    try {
      const product = await Product.findByPk(request.params.id);
      if (!product) {
        return reply.code(404).send({ error: "Product not found" });
      }
      reply.send(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      reply.code(500).send({ error: "Failed to fetch product" });
    }
  });

  fastify.post("/products", async (request, reply) => {
    try {
      const product = await Product.create(request.body);
      reply.code(201).send(product);
    } catch (error) {
      console.error("Error creating product:", error);
      reply.code(500).send({ error: "Failed to create product" });
    }
  });

  fastify.put("/products/:id", async (request, reply) => {
    try {
      const product = await Product.findByPk(request.params.id);
      if (!product) {
        return reply.code(404).send({ error: "Product not found" });
      }
      await product.update(request.body);
      reply.send(product);
    } catch (error) {
      console.error("Error updating product:", error);
      reply.code(500).send({ error: "Failed to update product" });
    }
  });

  fastify.delete("/products/:id", async (request, reply) => {
    try {
      const product = await Product.findByPk(request.params.id);
      if (!product) {
        return reply.code(404).send({ error: "Product not found" });
      }
      await product.destroy();
      reply.code(204).send();
    } catch (error) {
      console.error("Error deleting product:", error);
      reply.code(500).send({ error: "Failed to delete product" });
    }
  });
}

export default productRoutes;
