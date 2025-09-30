import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Google login
	const loginWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (err) {
			console.error(err);
		}
	};

	// Email/password login
	const loginWithEmail = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div style={{ textAlign: "center", marginTop: "2rem" }}>
			<h2>Login</h2>

			<div>
				<input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
				<input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
				<button onClick={loginWithEmail}>Login with Email</button>
			</div>

			<hr />
			<button onClick={loginWithGoogle}>Login with Google</button>
		</div>
	);
}

export default Login;
