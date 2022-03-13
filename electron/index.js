const electron = require("electron");
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

const id3 = require("./id3");
const image = require("./image");
const video = require("./video");

let mainWindow;

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
		title: "McPodcast - A Podcast Management App",
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

app.whenReady().then(() => {
	ipcMain.handle("getTags", (_, path) => id3.getTags(path));
	ipcMain.handle("setTags", (_, path, tags) => id3.setTags(path, tags));
	ipcMain.handle("toBuffer", (_, path) => image.toBuffer(path));
	ipcMain.handle("getVideo", (_, audioPath, image, videoPath, length) =>
		video.getVideo(audioPath, image, videoPath, length)
	);
	ipcMain.handle("askForSaveLocation", (_, path) =>
		electron.dialog.showSaveDialog(null, { defaultPath: path.replace(".mp3", ".mp4") })
	);
	createWindow();
	app.on("activate", function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

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
