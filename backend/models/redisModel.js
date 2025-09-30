const redis = require("redis");

const redisClient = redis.createClient({
	url: "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis error", err));

(async () => {
	await redisClient.connect();
	console.log("✅ Redis connected");
})();

const incrementClickCount = async (uid) => {
	const key = `clickCount:${uid}`;
	const count = await redisClient.incr(key);
	await redisClient.expire(key, 3600); // expire after 1 hour
	return count;
};

const getClickCount = async (uid) => {
	const key = `clickCount:${uid}`;
	const value = await redisClient.get(key);
	return value ? parseInt(value, 10) : 0;
};

module.exports = { incrementClickCount, getClickCount };
