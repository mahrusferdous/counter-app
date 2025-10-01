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
	await redisClient.expire(key, 3600); // 1 hour
	return parseInt(count, 10);
};

const getClickCount = async (uid) => {
	const key = `clickCount:${uid}`;
	const value = await redisClient.get(key);
	return value ? parseInt(value, 10) : 0;
};

// New helper: set the cache to a specific value (atomic)
const setClickCount = async (uid, value) => {
	const key = `clickCount:${uid}`;
	// Using SET with EX to both set and refresh TTL
	await redisClient.set(key, String(value), { EX: 3600 });
	return parseInt(value, 10);
};

const resetClickCount = async (uid) => {
	// Mirror DB reset by setting to 0 (instead of only deleting) — avoids transient reads
	return setClickCount(uid, 0);
};

module.exports = { incrementClickCount, getClickCount, setClickCount, resetClickCount };
