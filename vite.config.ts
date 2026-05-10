import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import devConfig from "./dev.config.json";

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	server: {
		host: "127.0.0.1",
		port: devConfig.lineosPort,
		strictPort: true,
		proxy: {
			"/api": {
				target: `http://127.0.0.1:${process.env.CORE_API_PORT ?? 5177}`,
				changeOrigin: true,
			},
		},
	},
});
