const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	getTags: (path) => ipcRenderer.invoke("getTags", path),
	setTags: (path, tags) => ipcRenderer.invoke("setTags", path, tags),
	toBuffer: (path) => ipcRenderer.invoke("toBuffer", path),
	getVideo: (audioPath, image, videoPath, length) =>
		ipcRenderer.invoke("getVideo", audioPath, image, videoPath, length),
	askForSaveLocation: (path) => ipcRenderer.invoke("askForSaveLocation", path),
});
