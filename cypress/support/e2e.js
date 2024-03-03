// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

/**
 * Using the `window:before:load` event, we can inject a script into the
 * browser to track memory usage. This is useful for detecting memory
 * leaks and other issues that can be caused by excessive memory usage.
 * 
 * The script will run every 250ms and track the maximum memory usage
 * of the JavaScript heap. When the browser window is unloaded, the
 * maximum memory usage is logged to the console along with the spec
 * file that was running. This could be written to a file or sent to
 * a server for further analysis.
 */
Cypress.on('window:before:load', (win) => {
    const script = `
      window.maxMemory = 0;
  
      const processMemoryUsage = () => {
        window.maxMemory = Math.max(window.maxMemory, performance.memory.usedJSHeapSize);
      }

      setInterval(processMemoryUsage, 250);
  
      window.getMemoryUsage = () => {
        processMemoryUsage();
        return window.maxMemory;
      }
    `;
    win.eval(script);
    win.onunload = () => {
      const memory = win.eval('window.getMemoryUsage()');
      console.log("Memory Usage (MB):", Number.parseInt(memory, 10) / 1024 / 1024);
      console.log(Cypress.spec.relativeToCommonRoot);
    }
});