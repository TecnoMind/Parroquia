const { app, BrowserWindow,globalShortcut, remote } = require('electron')

let win;

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff',
        icon: `file://${__dirname}/dist/assets/logo.png`
    });


    win.loadURL(`file://${__dirname}/dist/index.html`);

    //// uncomment below to open the DevTools.
    // win.webContents.openDevTools()


    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    });

    return win;
}

// Create window on electron intialization
app.on('ready', () =>{
    let win = createWindow();
    globalShortcut.register('CommandOrControl+T', () => {
        win.webContents.openDevTools();
    });

    globalShortcut.register('CommandOrControl+Y', () => {
        win.webContents.closeDevTools();
    })
} );

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }


});