/* eslint-disable react-refresh/only-export-components -- app entry co-locates the Shell component with its router singleton */
import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import FlightPage from "./pages/FlightPage";
import HotelPage from "./pages/HotelPage";
import Landing from "./pages/Landing";

function Shell() {
	return (
		<div id="app-root" className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
			<ScrollRestoration />
		</div>
	);
}

export const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <Shell />,
			children: [
				{ index: true, element: <Landing /> },
				{ path: "flight", element: <FlightPage /> },
				{ path: "hotel", element: <HotelPage /> },
				{ path: "*", element: <Landing /> },
			],
		},
	],
	{ basename: import.meta.env.BASE_URL },
);
