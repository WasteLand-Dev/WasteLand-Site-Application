const {app, BrowserWindow} = require('electron');
const path = require('path').join;
const url = require('url').format;
const os = require('os');

let win;
let progressInterval;
const iconPath = path(__dirname, 'icon.png');
const osplatform = os.platform;

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

async function progressBar() {
    const Increment = 0.03;
    const Interval_delay = 100;

    let c = 0
    progressInterval = setInterval(() => {
        win.setProgressBar(c);

        if (c < 2) {
            c += Increment;
        } else {
            c = (-Increment * 5)
        }
    }, Interval_delay)
};

app.on('ready', createWindow);

if (osplatform == 'win32') {
    app.once('ready', progressBar);
    app.on('before-quit', () => {
        clearInterval(progressInterval);
    });
} else {
    console.log("Your system probably does not support the progress bar.");
}

app.on('window-all-closed', () => {
    app.quit();
});