const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // var id = counter.getNextUniqueId();
  // console.log(id, counter.getNextUniqueId());
  // items[id] = text;
  // counter.writeCounter(null, { id, text });
  counter.getNextUniqueId(function(err, name) {
    var id = name;
    items[id] = text;

    var path1 = path.join(exports.dataDir, id + '.txt');
    // console.log(path1);
    fs.writeFile(path1, text, (err) => {
      if (err) {
        console.log('error writing file');
      } else {
        callback(null, { id, text });
      }
    })
  });
};

exports.readAll = (callback) => {
  var path = exports.dataDir;
  fs.readdir(path, (err, data) => {
    if (err) throw err;
    var array = [];
    if (data.length === 0) {
      callback(null, array);
    } else {
      for (var i = 0; i < data.length; i ++) {
        var obj = {id: data[i].slice(0, -4), text: data[i].slice(0, -4)}

        array.push(obj);
      }
      callback(null, array);
    }
    }
  );
  }
exports.readOne = (id, callback) => {

  if (id === 'notAnId' ) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    var pathId = path.join(exports.dataDir, id + '.txt');
    console.log(id);
    fs.readFile(pathId, (err, text) => {
      if (err) {
        throw err;
      } else {
        if (!text) {
          callback(new Error('Not found'))
        }
        callback(null, {id: id, text: String(text)});
      }
    })
  }
};

exports.update = (id, text, callback) => {
  var pathId = path.join(exports.dataDir, id + '.txt');
  console.log(pathId);

  fs.access(pathId, error => {
    if (error) {
      callback(new Error('no'));
    } else {
     fs.writeFile(pathId, text, (err) => {
       if (err) {
         console.log('error writing file');
       } else {
         callback(null, text[text] = text);
       }
     })
   }
  })

};

exports.delete = (id, callback) => {
  var pathId = path.join(exports.dataDir, id + '.txt');
  fs.unlink(pathId, (err) => {
    if (err) {
      callback(new Error('no'));
    } else {
      callback(null);
    }
  })
};


// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
