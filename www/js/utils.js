
var FileUtil = (function() {

    var DATADIR;
    var knownfiles = [];

    function onFSSuccess(fileSystem) {
        fileSystem.root.getDirectory("Android/data/tk.jcchen.ionic-demo", {create: true}, gotDir, onError);
    }

    function gotDir(d) {
        DATADIR = d;
        var reader = DATADIR.createReader();
        reader.readEntries(function(d) {
            gotFiles(d);
            
        }, onError);
    }

    function gotFiles(entries) {
        console.log("The dir has " + entries.length + " entries.");
        for(var i=0; i < entries.length; i++){
            console.log(entries[i].name + " " + entries[i].isDirectory);
            knownfiles.push(entries[i].name);
            renderPicture(entries[i].fullPath);
        }
    }

    function renderPicture(path) {
        
    }


    function onError(e) {
        console.log("ERROR");
        console.log( JSON.stringify(e) );
    }


    return {
        onFSSuccess: onFSSuccess
    };
    
})();


angular.module("starter.utils", [])
    .factory("FileUtil", function() {
        return FileUtil;
    });
