import { useEffect, useState } from "react";

function Counter({ user }) {
	const [count, setCount] = useState(null);

	useEffect(() => {
		if (!user?.uid) return;

		const storageKey = `counter-${user.uid}`;
		const savedCount = localStorage.getItem(storageKey);

		if (savedCount !== null) {
			setCount(parseInt(savedCount, 10));
		} else {
			setCount(0);
		}
	}, [user]);

	useEffect(() => {
		if (count !== null && user?.uid) {
			const storageKey = `counter-${user.uid}`;
			localStorage.setItem(storageKey, count);
		}
	}, [count, user]);

	const increment = () => setCount((prev) => prev + 1);
	const reset = () => setCount(0);

	if (!user) return null;
	if (count === null) return <p>Loading counter...</p>;

	return (
		<div className="card counter">
			<p className="meta">Your personal counter</p>
			<h1 className="big">{count}</h1>
			<div className="row">
				<button className="btn btn-primary" onClick={increment}>
					Click me
				</button>
				<button className="btn btn-ghost" onClick={reset}>
					Reset
				</button>
			</div>
			<p className="foot">Stored locally for {user.email}</p>
		</div>
	);
}

export default Counter;

// import { useEffect, useState } from "react";
// import { doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
// import { db } from "./firebase";

// function Counter({ user }) {
// 	const [count, setCount] = useState(null);

// 	useEffect(() => {
// 		if (!user?.uid) return;

// 		const ref = doc(db, "users", user.uid);

// 		// Load or create document
// 		const initCounter = async () => {
// 			const snap = await getDoc(ref);
// 			if (!snap.exists()) {
// 				await setDoc(ref, { count: 0 });
// 				setCount(0);
// 			} else {
// 				setCount(snap.data()?.count || 0);
// 			}
// 		};

// 		initCounter();

// 		// Listen for changes
// 		const unsub = onSnapshot(ref, (snap) => {
// 			if (snap.exists()) {
// 				setCount(snap.data()?.count ?? 0);
// 			}
// 		});

// 		return () => unsub();
// 	}, [user]);

// 	const increment = async () => {
// 		if (!user?.uid) return;
// 		const ref = doc(db, "users", user.uid);
// 		await updateDoc(ref, { count: (count ?? 0) + 1 });
// 	};

// 	const reset = async () => {
// 		if (!user?.uid) return;
// 		const ref = doc(db, "users", user.uid);
// 		await updateDoc(ref, { count: 0 });
// 	};

// 	if (!user) return null;
// 	if (count === null) return <p>Loading counter...</p>;

// 	return (
// 		<div className="card counter">
// 			<p className="meta">Your personal counter</p>
// 			<h1 className="big">{count}</h1>
// 			<div className="row">
// 				<button className="btn btn-primary" onClick={increment}>
// 					Click me
// 				</button>
// 				<button className="btn btn-ghost" onClick={reset}>
// 					Reset
// 				</button>
// 			</div>
// 			<p className="foot">Saved to Firestore for {user.email}</p>
// 		</div>
// 	);
// }

// export default Counter;
