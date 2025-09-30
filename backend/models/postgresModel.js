const { Pool } = require("pg");

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "counterdb",
	password: "maplestory101",
	port: 5432,
});

(async () => {
	await pool.query(`
    CREATE TABLE IF NOT EXISTS user_counters (
      uid TEXT PRIMARY KEY,
      count INTEGER DEFAULT 0
    );
  `);
	console.log("✅ Postgres table ready");
})();

const incrementCounter = async (uid) => {
	const res = await pool.query(
		`INSERT INTO user_counters (uid, count)
     VALUES ($1, 1)
     ON CONFLICT (uid)
     DO UPDATE SET count = user_counters.count + 1
     RETURNING count;`,
		[uid]
	);
	return res.rows[0].count;
};

const getCounter = async (uid) => {
	const res = await pool.query(`SELECT count FROM user_counters WHERE uid = $1`, [uid]);
	return res.rows.length ? res.rows[0].count : 0;
};

module.exports = { incrementCounter, getCounter };
