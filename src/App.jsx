/** @format */

import "./App.css";
import {
	Navigate,
	Route,
	Routes,
	useRoutes,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const queryClient = new QueryClient();




function App() {
	const UserRouting = useRoutes(UserRoutes);
	const AdminRouting = useRoutes(AdminRoutes);

	const isAdmin = false;
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#f86f03",
				},
			}}
		>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="/*" element={UserRouting} />
					<Route
						path="/login"
						element={isAdmin ? <Navigate to="/admin" replace /> : AdminRouting}
					/>
					<Route
						path="/admin/*"
						element={isAdmin ? AdminRouting : <Navigate to="/login" />}
					/>
				</Routes>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ConfigProvider>
	);
}

export default App;
