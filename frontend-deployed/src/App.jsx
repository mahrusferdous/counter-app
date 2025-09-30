import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import Counter from "./Counter";
import "./App.css";

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => unsub();
	}, []);

	if (!user) {
		return (
			<div className="app-shell">
				<div className="card">
					<h2>Sign in</h2>
					<Login />
				</div>
			</div>
		);
	}

	return (
		<div className="app-shell">
			<div className="card welcome">
				<div>
					<h3 style={{ margin: 0 }}>
						Welcome, <strong>{user.displayName || user.email}</strong>
					</h3>
					<br />
					<button className="btn btn-ghost mt-8" onClick={() => signOut(auth)}>
						Logout
					</button>
				</div>
			</div>
			<Counter user={user} />
		</div>
	);
}

export default App;
