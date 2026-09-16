import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { codeInspectorPlugin } from "code-inspector-plugin";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		codeInspectorPlugin({ bundler: "vite" }),
		react(),
		tailwindcss(),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "auto",
			includeAssets: ["favicon.svg", "apple-touch-icon-180x180.png"],
			manifest: {
				name: "TripSheet · 机票酒店行程单自定义生成器",
				short_name: "TripSheet",
				description: "多版式机票 / 酒店行程单，中英双语，实时预览，一键导出图片与 PDF。",
				lang: "zh-CN",
				theme_color: "#2563eb",
				background_color: "#ffffff",
				display: "standalone",
				orientation: "portrait",
				start_url: "/fly-hotel-itinerary/",
				scope: "/fly-hotel-itinerary/",
				icons: [
					{ src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
					{ src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
					{ src: "pwa-maskable-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
					{
						src: "pwa-maskable-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff2}"],
			},
		}),
	],
	base: "/fly-hotel-itinerary/",
	build: {
		outDir: "dist",
		emptyOutDir: true,
	},
});
