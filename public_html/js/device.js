function _randomUUID () {
    //http://books.google.nl/books?id=F6BdRqHozfsC&pg=PT170&lpg=PT170&dq=phonegap+randomUUID&source=bl&ots=Aji5lU7L8Z&sig=AIuKtMMEj_CUa8rf4YNTAQVTjgU&hl=nl&sa=X&ei=tpb7Ue6oCMPXPZfzgOgE&ved=0CDQQ6AEwAA#v=onepage&q=phonegap%20randomUUID&f=false
    var s = [], itoh = '0123456789ABCDEF';
    
    for(var i = 0; i < 32; i++) {
        s[i] = Math.floor(Math.random() * 0x10);
    }
    
    // Conform to RFC-4122, section 4.4
    s[14] = 4; // Set 4 high bits of time_high field to version
    s[19] = (s[19] & 0x3) | 0x8; // Specify 2 high bits of clock sequence
    
    // Convert to hex chars
    for(var i = 0; i < 36; i++) s[i] = itoh[s[i]];
    
    return s.join('');
}

function getDevice () {
    var _device = {
        'installation_id' : '',
        'device_id' : '',
        'manufacturer' : '',
        'model' : '',
        'sdk_int' : '',
        'unique_id' : ''
        };
    
    getDevice = function () {
        return _device;
    };

   return _device;
}

function installationID () {
    /*if(DEBUG)
        return 'eb67b432-42fa-49e7-97c8-0c7833290cd2';
    var installationFile = 'INSTALLATION';*/
    var id = '';
    
    /*function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as text");
            console.log(evt.target.result);
        };
        reader.readAsText(file);
    }

    var win = function (installationFile) {
        var reader = ;
        new FileReader().readAsText(installationFile);
    };

    var fail = function(evt) {
        alert(error.code);
    };

    entry.file(win, fail);

    
    /*win = function (writer) {
        writer.onwrite = function(evt) {
            console.log("write success");
        };
        writer.write("some sample text");
    };

    var fail = function(evt) {
        console.log();
    };

    entry.createWriter(win, fail);*/
    
    getDevice = function () {
        return _device;
    };

   return _device;
}


