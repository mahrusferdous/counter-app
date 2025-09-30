const { incrementClickCount, getClickCount } = require("../models/redisModel");
const { incrementCounter, getCounter } = require("../models/postgresModel");

const incrementClick = async (uid) => {
	const redisCount = await incrementClickCount(uid);
	await incrementCounter(uid);
	return redisCount;
};

const getClick = async (uid) => {
	let count = await getClickCount(uid);
	if (count === 0) {
		count = await getCounter(uid);
	}
	return count;
};

module.exports = { incrementClick, getClick };
