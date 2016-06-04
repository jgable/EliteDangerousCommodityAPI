const csv = require('csv-streamify');
const fs = require('fs');
const http = require('http');

const Importer = require('./Importer');

class CSVImporter extends Importer {
  constructor(Model, lineParser) {
    super(Model);
    this.processStream = new csv({objectMode: true, columns: true});
    this.handleItem = this.handleItem.bind(this);
    this.lineParser = lineParser;
  }

  handleItem(item) {
    const parsed = this.lineParser(item);

    this.Model.upsert(parsed);
  }
}

class CSVFileImporter extends CSVImporter {
  constructor(Model, lineParser, filePath) {
    super(Model, lineParser);
    this.filePath = filePath;
  }

  openStream() {
    return fs.createReadStream(this.filePath);
  }
}

class CSVWebImporter extends CSVImporter {
  constructor(Model, lineParser, url) {
    super(Model, lineParser);
    this.url = url;
  }

  openStream() {
    return http.get(this.url);
  }
}

CSVImporter.FromFile = (Model, lineParser, filePath) => {
  return new CSVFileImporter(Model, lineParser, filePath);
};

CSVImporter.FromWeb = (Model, lineParser, url) => {
  return new CSVWebImporter(Model, lineParser, url);
};

module.exports = CSVImporter;
