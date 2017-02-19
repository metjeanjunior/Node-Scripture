const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')
const Config = require('electron-config')
const config = new Config()

// let win = new BrowserWindow({backgroundColor: '#002b36'})
let win;
let secondWin;
let windowSize = config.get('windowsize') || { width: 1080, height: 720 }
let electronScreen
// let windowSize = config.get('windowsize') || { width: 800, height: 600 }

const windowSettings = {
    // show: false,
    title: app.getName(),
    // icon: __dirname + '/app/assets/img/icon.png',
    // width: 800,
    // height: 600,
    width: windowSize.width,
    height: windowSize.height,
    minWidth: 500,
    minHeight: 320,
    darkTheme: true,
    // backgroundColor: '#002b36',
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    webPreferences: {
        zoomFactor: 1.0,
        blinkFeatures: 'OverlayScrollbars'
    }
};

// win.on('ready-to-show', () => {
//   win.show()
// });

function createWindow () {
  // win = new BrowserWindow({width: 800, height: 600})
  win = new BrowserWindow(windowSettings)

  win.loadURL(`file://${__dirname}/app/index.html`)

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

function createSecondary()
{
    var displays = electronScreen.getAllDisplays();
    var externalDisplay = null;
    for (var i in displays) {
        if (displays[i].bounds.x != 0 || displays[i].bounds.y != 0) {
            externalDisplay = displays[i];
            break;
        }
    }

    if (externalDisplay) {
        secondWin = new BrowserWindow({
          x: externalDisplay.bounds.x + 50,
          y: externalDisplay.bounds.y + 50
        });
    }
}

function setupListeners ()
{
    electronScreen.on('display-added', () => {
        createSecondary()
    })
    electronScreen.on('display-removed', () => {
        secondWin.close()
    })
}

app.on('ready', () => {
    electronScreen = require('electron').screen;
	createWindow()
    createSecondary()
    setupListeners()

	let template = [{
	    label: app.getName(),
	    submenu: [
	      {
	        label: 'Website',
	        click() { shell.openExternal('https://fromscratch.rocks'); }
	      },
	      {
	        label: 'Support',
	        click() { shell.openExternal('https://github.com/Kilian/fromscratch/issues'); }
	      },
          {
              label: 'Reload',
              accelerator: 'CmdOrCtrl+R',
              click: function () {
                BrowserWindow.getFocusedWindow().reload()
              }
            },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Quit',
	        accelerator: 'CmdOrCtrl+Q',
	        click() { app.quit(); }
	      }]
	}];
	const menuBar = Menu.buildFromTemplate(template);
    // if (secondWin == null)
    // 	Menu.setApplicationMenu(menuBar);
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	app.quit()
})


exports.openWindow = () => {
    let win = new BrowserWindow(windowSettings)
}

exports.hasSecondary = () => {
    return secondWin != null;
}

exports.electronScreen = electronScreen;

exports.getScreen = () => {
    return electronScreen
}
