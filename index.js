"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var electron = require('electron');
var path = require('path');
var _a = require("electron-devtools-installer"), installExtension = _a.default, REACT_DEVELOPER_TOOLS = _a.REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS = _a.REDUX_DEVTOOLS;
var app = electron.app, BrowserWindow = electron.BrowserWindow, ipcMain = electron.ipcMain, dialog = electron.dialog;
var isDev = process.env.NODE_ENV === 'development';
var generateUniqueFileName = function () {
    var timestamp = Date.now().toString(36);
    var random = Math.random().toString(36).substr(2, 5);
    return "".concat(timestamp).concat(random, ".json");
};
ipcMain.handle("create-file", function (_1, _a) { return __awaiter(void 0, [_1, _a], void 0, function (_, _b) {
    var _c, canceled, filePath, name_1, e_1;
    var data = _b.data;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 4, , 5]);
                return [4 /*yield*/, dialog.showSaveDialog({
                        title: "Save File",
                        defaultPath: path.join(app.getPath('downloads'), generateUniqueFileName())
                    })];
            case 1:
                _c = _d.sent(), canceled = _c.canceled, filePath = _c.filePath;
                console.log("CANCELLED FILEPATH", { canceled: canceled, filePath: filePath });
                if (canceled || !filePath)
                    return [2 /*return*/, null];
                name_1 = generateUniqueFileName();
                if (!!fs.existsSync(name_1)) return [3 /*break*/, 3];
                return [4 /*yield*/, fs.promises.writeFile(filePath, data)];
            case 2:
                _d.sent();
                _d.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_1 = _d.sent();
                console.warn("Issues encountered while creating the file: \n", e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
ipcMain.handle('append-file', function (_1, _a) { return __awaiter(void 0, [_1, _a], void 0, function (_, _b) {
    var e_2;
    var name = _b.name, data = _b.data;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                if (!!fs.existsSync(name)) return [3 /*break*/, 2];
                return [4 /*yield*/, fs.promises.appendFile(name, data)];
            case 1:
                _c.sent();
                return [3 /*break*/, 3];
            case 2:
                console.info("The file in question does not exist. Please create it first.");
                _c.label = 3;
            case 3: return [2 /*return*/, null];
            case 4:
                e_2 = _c.sent();
                console.warn("Issues encountered while appending to the file: \n", e_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
ipcMain.handle('remove-file', function (_1, _a) { return __awaiter(void 0, [_1, _a], void 0, function (_, _b) {
    var e_3;
    var filePath = _b.path;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                if (!fs.existsSync(filePath)) return [3 /*break*/, 2];
                return [4 /*yield*/, fs.promises.unlink(filePath)];
            case 1:
                _c.sent();
                return [3 /*break*/, 3];
            case 2:
                console.info("The file does not exist, so no action was taken.");
                _c.label = 3;
            case 3: return [2 /*return*/, null];
            case 4:
                e_3 = _c.sent();
                console.warn("Issues encountered while removing the file: \n", e_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
ipcMain.handle('fetch-file', function (_1, _a) { return __awaiter(void 0, [_1, _a], void 0, function (_, _b) {
    var data, e_4;
    var filePath = _b.path;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                if (!fs.existsSync(filePath)) return [3 /*break*/, 2];
                return [4 /*yield*/, fs.promises.readFile(filePath, 'utf-8')];
            case 1:
                data = _c.sent();
                return [2 /*return*/, data];
            case 2:
                console.info("The file does not exist and cannot be returned.");
                _c.label = 3;
            case 3: return [2 /*return*/, null];
            case 4:
                e_4 = _c.sent();
                console.warn("Issues encountered while fetching the file: \n", e_4);
                return [2 /*return*/, null];
            case 5: return [2 /*return*/];
        }
    });
}); });
function createWindow() {
    var isDev = process.env.NODE_ENV === "development";
    var _a = electron.screen.getPrimaryDisplay().workAreaSize, width = _a.width, height = _a.height;
    var window = new BrowserWindow({
        width: width,
        height: height,
        title: "Graph Plotter",
        // titleBarStyle: "hidden",
        // frame: false,
        webPreferences: {
            preload: isDev ? path.join(__dirname, 'preload.js') : path.join(app.getAppPath(), 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            devTools: true,
            webSecurity: false
        },
        icon: "".concat(__dirname, "/icon.png")
    });
    window.setTitle("Graph Plotter");
    window.setIcon("".concat(__dirname, "/icon.png"));
    window.webContents.setAudioMuted(false);
    window.webContents.session.setPermissionRequestHandler(function (webContents, permission, callback) {
        if (permission === 'media')
            callback(true); // Grant audio/video access
        else
            callback(false);
    });
    if (isDev)
        window.loadURL('http://localhost:3000');
    else
        window.loadFile(path.join(__dirname, 'build', 'index.html'), { hash: '' });
    window.on("maximize", function () { window.webContents.send("window-maximized"); });
    window.on("unmaximize", function () { window.webContents.send("window-unmaximized"); });
}
app.whenReady().then(function () {
    if (isDev) {
        installExtension(REACT_DEVELOPER_TOOLS)
            .then(function (ext) { return console.log("Added Extension: ".concat(ext.name)); })
            .catch(function (err) { return console.log('An error occurred: ', err); });
        installExtension(REDUX_DEVTOOLS)
            .then(function (ext) { return console.log("Added Extension: ".concat(ext.name)); })
            .catch(function (err) { return console.log('An error occurred: ', err); });
    }
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
app.on('window-all-closed', function () { if (process.platform !== 'darwin')
    app.quit(); });
app.on('activate', function () { if (BrowserWindow.getAllWindows().length === 0)
    createWindow(); });
