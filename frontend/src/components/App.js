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

// Firebase config
const firebaseConfig = {
	apiKey: "AIzaSyCAR03Ue3cEdZ16SN4xkKUyC_p1yCBJFwQ",
	authDomain: "counter-app-counter.firebaseapp.com",
	projectId: "counter-app-counter",
	storageBucket: "counter-app-counter.firebasestorage.app",
	messagingSenderId: "670995716737",
	appId: "1:670995716737:web:3ae53876a024e808be4b80",
	measurementId: "G-HNQCEEBPS1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// WebSocket connection
const socket = io("http://localhost:3001");

function App() {
	const [user, setUser] = useState(null);
	const [clickCount, setClickCount] = useState(0);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	// Listen for auth state changes
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, setUser);
		return () => unsubscribe();
	}, []);

	// Listen for click updates
	useEffect(() => {
		socket.on("clickUpdate", (data) => {
			if (data.uid === user?.uid) {
				setClickCount(data.count);
			}
		});

		return () => {
			socket.off("clickUpdate");
		};
	}, [user]);

	// Google Sign-In
	const googleSignIn = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			setError(null);
		} catch (error) {
			setError(error.message);
		}
	};

	// Email/Password login
	const login = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			setError(null);
		} catch (error) {
			setError(error.message);
		}
	};

	// Handle button click
	const handleClick = () => {
		if (!user || !user.uid) {
			alert("Please log in first.");
			console.error("User or UID is missing", user);
			return;
		}
		socket.emit("incrementClick", user.uid);
	};

	// Fetch click count
	useEffect(() => {
		if (user && user.uid) {
			fetch(`http://localhost:3001/getClickCount/${user.uid}`)
				.then((res) => res.json())
				.then((data) => {
					setClickCount(data.count);
				})
				.catch((error) => console.error("Error fetching click count:", error));
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
					<button onClick={() => signOut(auth)}>Sign Out</button>
				</div>
			)}
		</div>
	);
}

export default App;
