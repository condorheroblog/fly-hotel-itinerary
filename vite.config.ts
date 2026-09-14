import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { codeInspectorPlugin } from "code-inspector-plugin";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [codeInspectorPlugin({ bundler: "vite" }), react(), tailwindcss()],
	base: "/fly-hotel-itinerary/",
	build: {
		outDir: "dist",
		emptyOutDir: true,
	},
});
