const {app, BrowserWindow} = require('electron');
const path = require('path').join;
const url = require('url').format;
const os = require('os');
const fs = require('fs');

let win;
let progressInterval;
const osplatform = os.platform;
const ostype = os.type;
const osrelease = os.release;
const osarch = os.arch;
const ostotalmem = os.totalmem;
const oshostname = os.hostname;
const sysinf = "Information about your system." + `\n` + osplatform + `\n` + ostype + `\n` + osrelease + `\n` + osarch + `\n` + ostotalmem + `\n` + oshostname;

async function createWindow() {
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        icon: path(__dirname, 'icon.png'),
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

async function createLogFile() {
    fs.open('session.log', 'w', (err) => {
        if(err) throw err;
        console.log('Log file created');
    });
    fs.writeFile('session.log', sysinf, (err) => {
        if(err) throw err;
        console.log('Log written.');
    });
};

createLogFile();
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