import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import io from "socket.io-client";
import "./App.css";

const firebaseConfig = {
	apiKey: "AIzaSyCAR03Ue3cEdZ16SN4xkKUyC_p1yCBJFwQ",
	authDomain: "counter-app-counter.firebaseapp.com",
	projectId: "counter-app-counter",
	storageBucket: "counter-app-counter.firebasestorage.app",
	messagingSenderId: "670995716737",
	appId: "1:670995716737:web:3ae53876a024e808be4b80",
	measurementId: "G-HNQCEEBPS1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// connect once
const socket = io("http://localhost:3001");

function App() {
	const [user, setUser] = useState(null);
	const [clickCount, setClickCount] = useState(0);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, setUser);
		return () => unsubscribe();
	}, []);

	// listen for broadcasted updates (increment or reset)
	useEffect(() => {
		const handler = (data) => {
			if (data.uid === user?.uid) {
				setClickCount(data.count);
			}
		};
		socket.on("clickUpdate", handler);
		return () => {
			socket.off("clickUpdate", handler);
		};
	}, [user]);

	const googleSignIn = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
			setError(null);
		} catch (err) {
			setError(err.message);
		}
	};

	const login = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			setError(null);
		} catch (err) {
			setError(err.message);
		}
	};

	const handleClick = () => {
		if (!user?.uid) {
			alert("Please log in first.");
			return;
		}
		socket.emit("incrementClick", user.uid);
	};

	const handleReset = () => {
		if (!user?.uid) {
			alert("Please log in first.");
			return;
		}
		if (!window.confirm("Are you sure you want to reset your count to 0?")) return;
		// Emit reset via websocket — server will broadcast the result
		socket.emit("resetClick", user.uid);
	};

	useEffect(() => {
		if (user && user.uid) {
			const fetchClickCount = async () => {
				try {
					const res = await fetch(`http://localhost:3001/getClickCount/${user.uid}`);
					const data = await res.json();
					setClickCount(data.count);
				} catch (error) {
					console.error("Error fetching click count:", error);
				}
			};

			fetchClickCount();
		} else {
			setClickCount(0); // clear count when no user
		}
	}, [user]);

	return (
		<div>
			{!user ? (
				<div>
					<h2>Login</h2>
					{error && <p style={{ color: "red" }}>{error}</p>}
					<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button onClick={login}>Log In</button>
					<div style={{ marginTop: "10px" }}>
						<button onClick={googleSignIn}>Sign In with Google</button>
					</div>
				</div>
			) : (
				<div>
					<h2>Welcome, {user.email}</h2>
					<p>Click count: {clickCount}</p>
					<button onClick={handleClick}>Click me!</button>
					<button onClick={handleReset} style={{ marginLeft: "10px", background: "orange" }}>
						Reset Count
					</button>
					<button onClick={() => signOut(auth)} style={{ marginLeft: "10px" }}>
						Sign Out
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
