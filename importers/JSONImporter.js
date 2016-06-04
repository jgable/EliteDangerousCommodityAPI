const fs = require('fs');
const http = require('http');
const JSONStream = require('JSONStream');

const Importer = require('./Importer');

class JSONImporter extends Importer {
  constructor(Model) {
    super(Model);
    this.processStream = JSONStream.parse('*');
    this.handleItem = this.handleItem.bind(this);
  }

  handleItem(item) {
    this.Model.upsert(item);
  }
}

class JSONFileImporter extends JSONImporter {
  constructor(Model, filePath) {
    super(Model);
    this.filePath = filePath;
  }

  openStream() {
    return fs.createReadStream(this.filePath);
  }
}

class JSONWebImporter extends JSONImporter {
  constructor(Model, url) {
    super(Model);
    this.url = url;
  }

  openStream() {
    return http.get(this.url);
  }
}

JSONImporter.FromFile = (Model, filePath) => {
  return new JSONFileImporter(Model, filePath);
};

JSONImporter.FromWeb = (Model, url) => {
  return new JSONWebImporter(Model, url);
};

module.exports = JSONImporter;
