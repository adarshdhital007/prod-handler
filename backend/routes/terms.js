import Terms from "../models/Terms.js";

async function termsRoutes(fastify, options) {
  fastify.get("/terms/:language", async (request, reply) => {
    try {
      const { language } = request.params;
      const terms = await Terms.findOne({ where: { language } });
      
      if (!terms) {
        return reply.code(404).send({ error: "Terms not found for this language" });
      }
      
      reply.send(terms);
    } catch (error) {
      console.error("Error fetching terms:", error);
      reply.code(500).send({ error: "Failed to fetch terms" });
    }
  });

  fastify.get("/terms", async (request, reply) => {
    try {
      const terms = await Terms.findAll({
        attributes: ['language', 'lastUpdated']
      });
      reply.send(terms);
    } catch (error) {
      console.error("Error fetching terms languages:", error);
      reply.code(500).send({ error: "Failed to fetch terms languages" });
    }
  });
}

export default termsRoutes; 