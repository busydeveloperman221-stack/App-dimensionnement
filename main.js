const { app, BrowserWindow, Menu, shell } = require('electron/main')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    
    },
  })

  win.loadFile('appdimsolirrig.html');

  // Custom Menu
  const menuTemplate = [
    {
      label: 'Fichier',
      submenu: [
        {
          label: 'Zoom',
          accelerator: 'Ctrl+=',
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow()
            if (focusedWindow) {
              focusedWindow.webContents.setZoomLevel(
                focusedWindow.webContents.getZoomLevel() + 1
              )
            }
          },
        },
        {
          label: 'Dézoom',
          accelerator: 'Ctrl+-',
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow()
            if (focusedWindow) {
              focusedWindow.webContents.setZoomLevel(
                focusedWindow.webContents.getZoomLevel() - 1
              )
            }
          },
        },
          
        {
          label: 'Quitter',
          accelerator: 'F4',
          click: () => {
            app.quit()
          },
        },
      ],
    },
    {
      label: 'Édition',
      submenu: [
        { role: 'undo', label: 'Annuler', accelerator: 'Ctrl+Z' },
        { role: 'redo', label: 'Rétablir', accelerator: 'Ctrl+Y' },
        { type: 'separator' },
        { role: 'cut', label: 'Couper', accelerator: 'Ctrl+X' },
        { role: 'copy', label: 'Copier', accelerator: 'Ctrl+C' },
        { role: 'paste', label: 'Coller', accelerator: 'Ctrl+V' },
        { role: 'selectAll', label: 'Tout sélectionner', accelerator: 'Ctrl+A' },
      ],
    },
    {
      label: 'Affichage',
      submenu: [
        {
          label: 'Recharger',
          accelerator: 'F5',
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow()
            if (focusedWindow) {
              focusedWindow.webContents.reload()
            }
          },
        },
        {
          label: 'Plein écran',
          accelerator: 'F11',
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow()
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
            }
          },
        },
        {
            label: 'Aide',
            submenu: [
              {
                label: 'YouTube',
                click: () => {
                  shell.openExternal('https://www.youtube.com')
                },
              },
              {
                label: 'Instagram',
                click: () => {
                  shell.openExternal('https://www.instagram.com')
                },
              },
              {
                label: 'Facebook',
                click: () => {
                  shell.openExternal('https://www.facebook.com')
                },
              },
              {
                label: 'Twitter',
                click: () => {
                  shell.openExternal('https://www.twitter.com')
                },
              },
            ],
          },
      ],
    },
    
    
  ];

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


//  npx electron-packager . DIMSOLIRRIG --platform=win32 --arch=x64 --icon=assets/icon.ico --out=dist --overwrite

