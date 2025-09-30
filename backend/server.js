const Fastify = require("fastify");
const fastifyCors = require("@fastify/cors");
const { Server } = require("socket.io");
const http = require("http");

const clickRoutes = require("./routes/clickRoutes");
const { incrementClick } = require("./controllers/clickController");

const fastify = Fastify();
fastify.register(fastifyCors, { origin: "*" });
fastify.register(clickRoutes);

const server = http.createServer(fastify.server);

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
	console.log("🔌 User connected");

	socket.on("incrementClick", async (uid) => {
		try {
			const newCount = await incrementClick(uid);
			socket.emit("clickUpdate", { uid, count: newCount });
		} catch (err) {
			console.error(err);
		}
	});

	socket.on("disconnect", () => {
		console.log("❌ User disconnected");
	});
});

server.listen(3001, (err) => {
	if (err) throw err;
	console.log("🚀 Backend running on http://localhost:3001");
});
