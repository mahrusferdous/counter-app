const Fastify = require("fastify");
const axios = require("axios");
const fastify = Fastify();

// FastAPI GPU service endpoint
const GPU_SERVICE_URL = "http://localhost:8000/run-compute";

fastify.get("/run-compute", async (request, reply) => {
	try {
		const response = await axios.get(GPU_SERVICE_URL);
		reply.send(response.data);
	} catch (error) {
		reply.status(500).send({ error: "Failed to connect to GPU service" });
	}
});

fastify.listen(3000, (err, address) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
	console.log(`Server listening at ${address}`);
});
