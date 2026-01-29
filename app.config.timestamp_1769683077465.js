// app.config.ts
import { defineConfig } from "@tanstack/start/config";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
var app_config_default = defineConfig({
  vite: {
    plugins: [
      TanStackRouterVite(),
      viteTsConfigPaths({
        projects: ["./tsconfig.json"]
      })
    ]
  },
  server: {
    preset: "node-server"
  }
});
export {
  app_config_default as default
};
