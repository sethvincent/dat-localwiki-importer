var through = require('through2');
var JSONStream = require('JSONStream');
var LocalWikiClient = require('localwiki-client');
var region = require('./region');

var wiki = new LocalWikiClient();

module.exports = function (dat, done) {

  function getPages (page) {
    wiki.list('pages', { region__slug: region, page: page, limit: 100 })
      .pipe(through(checkStatus))
      .pipe(JSONStream.parse('results.*'))
      .on('data', save)
      .on('end', function () {
        getPages(++page);
      })
  }

  function checkStatus (chunk, enc, next) {
    if (chunk.toString() === "{\"detail\": \"Not found\"}") return done();
    else { 
      this.push(chunk);
      next();
    }
  }

  function save (data) {
    dat.put(data, function (err) {
      if (err) console.log(err)
      console.log('importing:', data.name);
    });
  }

  getPages(1);
}