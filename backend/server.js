import Fastify from "fastify";
import sequelize from "./db.js";
import productRoutes from "./routes/products.js";
import termsRoutes from "./routes/terms.js";
import Product from "./models/Product.js";
import Terms from "./models/Terms.js";
import fastifyCors from "@fastify/cors";

const fastify = Fastify({ logger: true });

const port = process.env.PORT || 3000;

fastify.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

fastify.register(productRoutes);
fastify.register(termsRoutes);

fastify.get("/", async () => ({ hello: "world" }));

const start = async () => {
  try {
    await sequelize.authenticate();
    await Product.sync({ alter: true });
    await Terms.sync({ alter: true });

    await fastify.listen({ port: port, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
