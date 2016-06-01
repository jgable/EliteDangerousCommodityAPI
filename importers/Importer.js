const es = require('event-stream');

module.exports = class Importer {
  constructor(Model) {
    this.Model = Model;
  }

  import() {
    return new Promise((resolve, reject) => {
      // TODO: Create a transaction and save as this.transaction
      this.openStream()
        .pipe(this.processStream)
        .pipe(es.mapSync(this.handleItem))
        .on('end', () => {
          this.handleEnd();
          resolve();
        })
        .on('error', err => {
          this.handleError();
          reject(err);
        });
    });
  }

  openStream() {}
  processStream() {}
  handleItem() {}
  handleEnd() {}
  handleError() {}
}
