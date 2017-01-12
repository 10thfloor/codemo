/* eslint-disable no-unused-vars */
import moduleJson from './module.json';
import { app, dialog } from 'electron';

const dirTree = require('directory-tree');

/**
 * Example module.
 *
 * @param {Object} log         - Winston logger instance
 * @param {Object} skeletonApp - reference to the skeleton app instance
 * @param {Object} appSettings - settings.json contents
 * @param {Object} eventsBus   - event emitter for listening or emitting events
 *                               shared across skeleton app and every module/plugin
 * @param {Object} modules     - references to all loaded modules
 * @param {Object} settings    - module settings
 * @param {Object} Module      - reference to the Module class
 * @constructor
 */
export default class Example {
  constructor({ log, skeletonApp, appSettings, eventsBus, modules, settings, Module }) {
    /**
     * You can delete unused vars from the param destructuring.
     * Left them here just to emphasize what is passed. Delete the eslint rule at the top
     * when done.
     * You can also just have a one `config` param and do `Object.assign(this, config);`
     */
    this.module = new Module(moduleJson.name);

    // Get the automatically predefined logger instance.
    this.log = log;
    this.eventsBus = eventsBus;

    // Never do time consuming or blocking things directly in the constructor.
    // Instead hook to 'beforeDesktopJsLoad`, `desktopLoaded` or `afterInitialization` events.
    // This will also ensure plugins providing things like splash screens will be able
    // to start as quickly as possible.
    this.eventsBus.on('desktopLoaded', () => {
      this.init();
    });
  }

  init() {
    // Do some initialization if necessary.

    this.registerApi();
    // Lets inform that the module has finished loading.
    this.eventsBus.emit(`${moduleJson.name}.loaded`);
  }

  registerApi() {
    const module = this.module;

    module.on('loadFolder', (event, fetchId, testArg) => {
      this.showFilePicker(fetchId);
    });
  }

  showFilePicker(fetchId) {
    dialog.showOpenDialog({
      title: "Select a folder",
      properties: ['openDirectory']
    }, (folderPath) => {
      let files;
      if (!folderPath) {
        this.module.respond('loadFolder', fetchId, "No destination folder selected");
      } else {
        files = dirTree(folderPath[0], null, null, ['^[.]'], ['^[.]', 'node_modules']);
        this.module.respond('loadFolder', fetchId, files);
      }
    });
  }
}
