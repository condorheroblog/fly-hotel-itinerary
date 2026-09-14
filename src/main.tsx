import { NuqsAdapter } from "nuqs/adapters/react-router/v8";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./App";
import "./i18n";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl)
	throw new Error("Root element #root not found");

createRoot(rootEl).render(
	<StrictMode>
		<NuqsAdapter>
			<RouterProvider router={router} />
		</NuqsAdapter>
	</StrictMode>,
);
