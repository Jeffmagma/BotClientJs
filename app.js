const electron = require('electron');
const {app, BrowserWindow} = electron;

function createWindow() {
	//let splash = new BrowserWindow({width: 810, height: 610, transparent: true, frame: false, alwaysOnTop: true});
	//splash.loadURL(`file://${__dirname}/splash.html`);

    let win = new BrowserWindow({width: 800, height: 600, show: false});
	win.loadURL('file://' + __dirname + '/modal.html');
	win.setMenu(null);

    win.on('closed', () => {
        win = null;
    });

	win.once('ready-to-show', () => {
		//splash.destroy();
		win.show();
	});
}

app.on('ready', createWindow);