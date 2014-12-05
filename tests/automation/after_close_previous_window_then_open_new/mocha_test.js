var path = require('path');
var assert  =require('assert');
var fs = require('fs-extra');
var spawn = require('child_process').spawn;
var curDir = fs.realpathSync('.');

var result;

var dumpDir = path.join(curDir, 'internal', 'tmp');
console.log('dumpDir:' + dumpDir);

describe('after close previous window then open new', function() {
    after(function () {
    	fs.remove(dumpDir, function (er) {
            if (er) throw er;
        });
    });

    before(function(done) {
      this.timeout(0);
      if (!fs.existsSync(dumpDir))
	    fs.mkdirSync(dumpDir);

      var appPath = path.join(curDir, 'internal');
      var child = spawnChildProcess(appPath);
      child.on('exit', function() {
        done();
      });

    });

    it('should not crash', function() {
      result = fs.readdirSync(dumpDir);	
      assert.equal(result.length, 0);
    });

});

