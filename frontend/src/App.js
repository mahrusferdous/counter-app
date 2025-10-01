import React, { useState, useEffect } from "react";
import {
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut as firebaseSignOut,
} from "firebase/auth";
import io from "socket.io-client";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { auth, googleProvider } from "./firebase";
import "./App.css";

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
			setClickCount(0);
		}
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
		socket.emit("resetClick", user.uid);
	};

	const signOut = () => firebaseSignOut(auth);

	return (
		<div className="app-container">
			{!user ? (
				<Login
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					error={error}
					login={login}
					googleSignIn={googleSignIn}
				/>
			) : (
				<Dashboard
					user={user}
					clickCount={clickCount}
					handleClick={handleClick}
					handleReset={handleReset}
					signOut={signOut}
				/>
			)}
		</div>
	);
}

export default App;
