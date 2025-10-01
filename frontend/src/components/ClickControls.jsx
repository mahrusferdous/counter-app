import React from "react";

export default function ClickControls({ handleClick, handleReset, signOut, user }) {
	return (
		<div className="controls-container">
			<button onClick={handleClick}>Click me!</button>
			<button className="reset-btn" onClick={handleReset}>
				Reset Count
			</button>
			<button onClick={() => signOut()} style={{ marginLeft: "10px" }}>
				Sign Out
			</button>
		</div>
	);
}
