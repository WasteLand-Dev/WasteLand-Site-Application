const {app, BrowserWindow} = require('electron');
const path = require('path').join;
const url = require('url').format;

let win
const iconPath = path(__dirname, 'icon.png');

async function createWindow() {
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        icon: iconPath,
        titleBarStyle: '',
        autoHideMenuBar: true,
        titleBarOverlay: {
            color: '#2F353B',
            symbolColor: '#C7D0CC'
        },
        webPreferences: {
            nodeIntegrationInWorker: true
        }
    });

    win.loadURL(url({
        hostname: 'wlorigin.cf',
        protocol: 'https'
    }));

    win.on('closed', () => {
        win = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});
