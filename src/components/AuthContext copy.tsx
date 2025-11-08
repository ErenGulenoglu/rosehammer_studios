import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "@/api";

// ------------------------
// 1. Define the shape of the "user" data
// ------------------------
interface User {
	token: string; // JWT token for authentication
	email?: string;
	first_name?: string;
	last_name?: string;
}

// ------------------------
// 2. Define the shape of our authentication context
// ------------------------
interface AuthContextType {
	user: User | null; // null means no one is logged in
	setUser: React.Dispatch<React.SetStateAction<User | null>>; // function to update user
	loading: boolean; // true while checking localStorage on page load
}

// ------------------------
// 3. Create the context object
// ------------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ------------------------
// 4. Define props for the AuthProvider component
// ------------------------
interface AuthProviderProps {
	children: ReactNode; // anything React can render
}

// ------------------------
// 5. AuthProvider component
// ------------------------
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				// Ask backend to refresh access token — refresh token comes from cookie automatically
				// const refreshRes = await api.post("/users/token/refresh/");
				const refreshRes = await api.post("/users/token/refresh/", null, { withCredentials: true }); // burada patliyor
				const newAccess = refreshRes.data.access;
				// Use new access token to get user info

				const profileRes = await api.get("/users/me/", {
					headers: { Authorization: `Bearer ${newAccess}` },
				});
				setUser({ token: newAccess, ...profileRes.data });
			} catch (err) {
				console.warn("Not logged in or refresh failed:", err);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, []);

	return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>;
};

// ------------------------
// 6. Custom hook to use authentication in any component
// ------------------------
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}

	return context; // returns { user, setUser, loading }
};
