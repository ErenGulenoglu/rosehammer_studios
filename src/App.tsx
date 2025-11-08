import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";
import LoTA from "./pages/LoTA";
import Login from "./pages/Login";
import { AuthProvider } from "./components/AuthContext";
import { PublicRoute, PrivateRoute } from "./components/RoutesGuard";
import { ThemeProvider } from "./components/theme-provider";

function App() {
	return (
		<AuthProvider>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<div>
					<BrowserRouter>
						<Routes>
							{/* Public Route */}
							<Route path="/" element={<Home />} />

							{/* Public Route */}
							<Route path="/lota" element={<LoTA />} />

							{/* Public Route */}
							<Route
								path="/login"
								element={
									<PublicRoute>
										<Login />
									</PublicRoute>
								}
							/>

							{/* <Route path="*" element={<NotFound />} /> */}
						</Routes>
					</BrowserRouter>
				</div>
			</ThemeProvider>
		</AuthProvider>
	);
}

export default App;
