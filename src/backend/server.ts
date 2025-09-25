import { registry } from "./registry";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	const app = new Hono();

	if (process.env.NODE_ENV === "production") {
		app.use("/*", serveStatic({ root: join(__dirname, "../dist/frontend") }));
	}

	serve({
		fetch: app.fetch,
		port: 8080,
	});
	console.log("Serving frontend on port 8080");
}

// Start RivetKit
registry.start({
	cors: isProd
		? undefined
		: { origin: "http://localhost:5173", credentials: true },
});
