async function clickRoutes(fastify, options) {
	const { getClick } = require("../controllers/clickController");

	fastify.get("/getClickCount/:uid", async (request, reply) => {
		const { uid } = request.params;
		try {
			const count = await getClick(uid);
			reply.send({ count });
		} catch (err) {
			reply.status(500).send({ error: "Error fetching click count" });
		}
	});
}

module.exports = clickRoutes;
