const { incrementClickCount, getClickCount, setClickCount, resetClickCount } = require("../models/redisModel");
const { incrementCounter, getCounter, resetCounter } = require("../models/postgresModel");

// Authoritative: update DB first, then mirror into Redis.
// Return DB count as the authoritative result.
const incrementClick = async (uid) => {
	const dbCount = await incrementCounter(uid); // persistent update
	await setClickCount(uid, dbCount); // mirror to redis
	return dbCount;
};

const getClick = async (uid) => {
	// Fast path: try redis cache
	const r = await getClickCount(uid);
	if (r && r > 0) {
		return r;
	}
	// Authoritative fallback: DB
	const db = await getCounter(uid);
	// mirror DB to redis for subsequent reads
	await setClickCount(uid, db);
	return db;
};

const resetClick = async (uid) => {
	const dbCount = await resetCounter(uid); // set DB to 0 (guaranteed row)
	await setClickCount(uid, dbCount); // mirror 0 into redis
	return dbCount;
};

module.exports = { incrementClick, getClick, resetClick };
