import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const lineosDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(__dirname, "..", "..");
const configPath = path.join(repoRoot, "apps", "dev.config.json");

const childProcesses = [];

function getNpmCommand() {
	return process.platform === "win32" ? "npm.cmd" : "npm";
}

function prefixStream(stream, label) {
	stream.on("data", (chunk) => {
		for (const line of chunk.toString().split(/\r?\n/)) {
			if (line.trim()) {
				console.log(`[${label}] ${line}`);
			}
		}
	});
}

function runProcess(label, args, spawnOptions = {}) {
	const child = spawn(getNpmCommand(), args, {
		stdio: ["ignore", "pipe", "pipe"],
		env: process.env,
		...spawnOptions,
	});

	prefixStream(child.stdout, label);
	prefixStream(child.stderr, label);
	childProcesses.push(child);

	child.on("exit", (code, signal) => {
		if (signal) {
			console.log(`[${label}] exited via signal ${signal}`);
			return;
		}

		console.log(`[${label}] exited with code ${code ?? 0}`);
	});

	return child;
}

function resolveAppDir(app, rootDir) {
	if (!app.dir) {
		throw new Error(
			`App "${app.slug}" is missing a dir in apps/dev.config.json`
		);
	}

	if (!app.port) {
		throw new Error(
			`App "${app.slug}" is missing a port in apps/dev.config.json`
		);
	}

	const appDir = path.resolve(rootDir, app.dir);
	if (!fs.existsSync(appDir)) {
		throw new Error(`App "${app.slug}" directory does not exist: ${app.dir}`);
	}

	return appDir;
}

function shutdown() {
	for (const child of childProcesses) {
		if (!child.killed) {
			child.kill("SIGTERM");
		}
	}
	process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

runProcess("api", ["run", "dev:api"], { cwd: lineosDir });

let iframeApps = [];
let devConfig = null;

if (fs.existsSync(configPath)) {
	devConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
	iframeApps = devConfig.apps ?? [];

	runProcess("proxy", ["run", "dev:proxy"], { cwd: repoRoot });

	const host = devConfig.host ?? "127.0.0.1";
	for (const app of iframeApps) {
		runProcess(app.slug, ["run", "dev", "--", "--host", host, "--port", String(app.port), "--strictPort"], {
			cwd: resolveAppDir(app, repoRoot),
		});
	}
} else {
	console.warn(
		`[dev] Missing ${path.relative(process.cwd(), configPath)} — iframe apps and proxy not started`
	);
}

runProcess("vite", ["run", "dev:vite", "--", ...process.argv.slice(2)], {
	cwd: lineosDir,
});
