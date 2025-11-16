import { useEffect, useState } from "react";
import api from "@/api";

function VerifyEmail() {
	const [message, setMessage] = useState("Verifying...");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = new URLSearchParams(window.location.search).get("token");

		if (!token) {
			setMessage("Invalid verification link.");
			setLoading(false);
			return;
		}

		api
			.post("/users/verify-email/", { token }) // POST with JSON body
			.then((res) => {
				// Ensure res.data.detail exists and is a string
				if (res.data && typeof res.data.detail === "string") {
					setMessage(res.data.detail);
				} else {
					setMessage("Email verified! You can now log in.");
				}
			})
			.catch((err) => {
				console.error("Verify error:", err.response || err);

				if (err.response && err.response.data && err.response.data.detail) {
					setMessage(err.response.data.detail);
				} else if (err.response && err.response.status === 400) {
					setMessage("Verification failed or link expired.");
				} else {
					setMessage("Something went wrong. Try again later.");
				}
			})
			.finally(() => setLoading(false));
	}, []);

	return <div>{loading ? <p>Verifying...</p> : <p>{message}</p>}</div>;
}

export default VerifyEmail;
