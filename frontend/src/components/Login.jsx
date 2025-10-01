import React from "react";

export default function Login({ email, setEmail, password, setPassword, error, login, googleSignIn }) {
	return (
		<div className="login-container">
			<h2>Login</h2>
			{error && <p className="error">{error}</p>}
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
	);
}
