import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import devConfig from "../apps/dev.config.json";

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	server: {
		host: "127.0.0.1",
		port: devConfig.corePort,
		strictPort: true,
	},
});
