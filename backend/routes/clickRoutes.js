async function clickRoutes(fastify, options) {
	const { getClick, resetClick } = require("../controllers/clickController");

	fastify.get("/getClickCount/:uid", async (request, reply) => {
		const { uid } = request.params;
		try {
			const count = await getClick(uid);
			reply.send({ count });
		} catch (err) {
			reply.status(500).send({ error: "Error fetching click count" });
		}
	});

	fastify.post("/resetClickCount/:uid", async (request, reply) => {
		const { uid } = request.params;
		try {
			const count = await resetClick(uid);
			reply.send({ uid, count });
		} catch (err) {
			reply.status(500).send({ error: "Error resetting click count" });
		}
	});
}

module.exports = clickRoutes;
