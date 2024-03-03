# Exercise: Tracking browser memory usage during Cypress E2E tests

This repository contains exercises and resources for tracking browser 
memory usage during Cypress end-to-end (E2E) tests. This can be used
to track memory leaks and other performance issues that happen during
high memory pressure.

[cypress/support/e2e.js](./cypress/support/e2e.js) uses Cypress'`window:before:load` event to inject a script to poll and log
the peak memory usage.