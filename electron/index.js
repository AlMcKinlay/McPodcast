const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

let mainWindow;

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 600,
		webPreferences: { nodeIntegration: true, enableRemoteModule: true, contextIsolation: false },
	});

	const startUrl =
		process.env.ELECTRON_START_URL ||
		url.format({
			pathname: path.join(__dirname, "/../build/index.html"),
			protocol: "file:",
			slashes: true,
		});
	mainWindow.loadURL(startUrl);

	// Open the DevTools.
	if (process.argv.includes("dev")) {
		mainWindow.webContents.openDevTools();
	}

	mainWindow.on("closed", function () {
		mainWindow = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});
