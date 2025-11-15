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
			.get(`/users/verify-email/?token=${token}`)
			.then(() => {
				setMessage("Email verified! You can now log in.");
			})
			.catch((error) => {
				if (error.response?.status === 400) {
					setMessage("Verification failed or link expired.");
				} else {
					setMessage("Something went wrong. Try again later.");
				}
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return <div>{loading ? <p>Verifying...</p> : <p>{message}</p>}</div>;
}

export default VerifyEmail;
