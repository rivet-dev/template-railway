import { createClient } from "rivetkit/client";
import type { Registry } from "../src/registry";

async function main() {
	const client = createClient<Registry>(
		process.env.ENDPOINT ?? "http://127.0.0.1:6420",
	);

	const counter = client.counter.getOrCreate();

	for (let i = 0; i < 5; i++) {
		const out = await counter.increment(5);
		console.log("RPC:", out);

		await new Promise((resolve) => setTimeout(resolve, 1000));
	}
}

main();
