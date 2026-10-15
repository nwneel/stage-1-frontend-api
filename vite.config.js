import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const shipStationApiKey =
    (env.SHIPSTATION_V2_API_KEY || env.VITE_SHIPSTATION_V2_API_KEY || "").trim();
  const checkShippingConfiguration = (server) => {
    server.middlewares.use("/shipstation", (_req, res, next) => {
      if (shipStationApiKey) {
        next();
        return;
      }

      const message =
        "Shipping is not configured. Set SHIPSTATION_V2_API_KEY in .env.local and restart Vite.";
      server.config.logger.error(message);
      res.statusCode = 503;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ errors: [{ message }] }));
    });
  };
  const shipStationProxy = {
    "/shipstation": {
      target: "https://api.shipstation.com",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/shipstation/, ""),
      headers: { "API-Key": shipStationApiKey },
    },
  };

  return {
    base: mode === "development" ? "/" : "/stage-1-frontend-api/",
    plugins: [
      react(),
      {
        name: "shipstation-configuration",
        configureServer: checkShippingConfiguration,
        configurePreviewServer: checkShippingConfiguration,
      },
    ],
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
