import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const shipStationProxy = {
    "/shipstation": {
      target: "https://api.shipstation.com",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/shipstation/, ""),
      headers: { "API-Key": env.VITE_SHIPSTATION_V2_API_KEY || "" },
    },
  };

  return {
    base: "/stage-1-frontend-api/",
    plugins: [react()],
    define: {
      __DEV_SERVER_ID__: JSON.stringify(String(Date.now())),
    },
    server: {
      port: 3000,
      proxy: shipStationProxy,
    },
    preview: {
      proxy: shipStationProxy,
    },
  };
});
