const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
  // once electron has started up, create a window.
  const window = new BrowserWindow({ width: 800, height: 600 });

  // hide the default menu bar that comes with the browser window
  window.setMenu(null);

  // load a website to display
  window.loadUrl(`http://example.com`);
});
