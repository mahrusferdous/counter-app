import React from "react";
import ClickControls from "./ClickControls";

export default function Dashboard({ user, clickCount, handleClick, handleReset, signOut }) {
	return (
		<div className="dashboard-container">
			<h2>Welcome, {user.email}</h2>
			<p>Click count: {clickCount}</p>
			<ClickControls handleClick={handleClick} handleReset={handleReset} signOut={signOut} user={user} />
		</div>
	);
}
