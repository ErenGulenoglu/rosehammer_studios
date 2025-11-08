import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import api from "@/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthContext";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
	const { setUser } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [hasError, setHasError] = useState(false);
	const [showLoading, setShowLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setShowLoading(true);
			setHasError(false);
			const accessRes = await api.post("/users/token/", { email, password });
			const access = accessRes.data.access;
			const refresh = accessRes.data.refresh;

			const profileRes = await api.get("/users/me/", {
				headers: { Authorization: `Bearer ${access}` },
			});
			console.log("Profile data:", profileRes.data);
			setUser({ token: access, email: profileRes.data.email, first_name: profileRes.data.first_name, last_name: profileRes.data.last_name }); // this needs to be fixed
			setError("");
			// navigate("/");
		} catch (error) {
			setShowLoading(false);
			console.error("Login failed:", error);
			setError("Wrong email or password.");
			setHasError(true);
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<form onSubmit={handleSubmit}>
				<FieldGroup>
					<div className="flex flex-col items-center gap-2 text-center">
						<a href="#" className="flex flex-col items-center gap-2 font-medium">
							<div className="flex size-8 items-center justify-center rounded-md">
								<GalleryVerticalEnd className="size-6" />
							</div>
							<span className="sr-only">asd</span>
						</a>
						<h1 className="text-xl font-bold">Welcome to Rosehammer Studios</h1>
						<FieldDescription>
							Don&apos;t have an account? <a href="#">Sign up</a>
						</FieldDescription>
					</div>
					<Field>
						<FieldLabel htmlFor="email">Username</FieldLabel>
						<Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="m@example.com" required />
					</Field>
					<Field>
						<FieldLabel htmlFor="password">Password</FieldLabel>
						<Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="" required />
					</Field>
					{hasError && <p className="text-red-600">{error}</p>}
					{showLoading && (
						<div className="flex flex-col items-center text-center">
							<Spinner />
						</div>
					)}
					{!showLoading && (
						<Field>
							<Button type="submit" className="cursor-pointer">
								Login
							</Button>
						</Field>
					)}
				</FieldGroup>
			</form>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
			</FieldDescription>
		</div>
	);
}
