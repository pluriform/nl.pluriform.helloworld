function onDeviceReady() {
    //setState('Device ready..');
}

function onInit () {
    //document.addEventListener('deviceready', onDeviceReady, false);
    //document.addEventListener('menubutton', onMenuKeyDown, false);
}

function onMenuKeyDown () {
    setState('menu button clicked');
}

function getElement (id) {
    return document.getElementById(id);
}

function startLoad () {
    document.getElementById('loading').setAttribute('style', 'display:none;');
    document.getElementById('buttons').setAttribute('style', 'display:block;');
}

function stopLoad () {
    document.getElementById('buttons').setAttribute('style', 'display:none;');
    document.getElementById('loading').setAttribute('style', 'display:block;');
}

function setState (message) {
    setText('state', message);
    //document.removeChild(getElementById('load'));
}

function setText (node, message) {
    getElement(node).innerHTML = message;
}

function parse (xml) {
    
    var parser = new DOMParser ();
    var modelxml = parser.parseFromString (xml, 'text/xml');
    var resourcesxml = modelxml.getElementsByTagName ('PFTokenUrl');

    for (var i = 0; i < resourcesxml.length; i++) {
        var pftokenurl = resourcesxml[i];
        
        document.getElementById('response').innerHTML += pftokenurl.getAttribute('name');
        document.getElementById('response').innerHTML += pftokenurl.getAttribute('host');
        document.getElementById('response').innerHTML += pftokenurl.getAttribute('path');
    }
}
function retrieveUrls () {
    setState('Create XMLHttpRequest');
    //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    /*var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://www.pluriform.nl/xmlservices/PFTokenDevice/soap11/RetrieveUrls');
    
     // build SOAP request
    var sr =
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xmlns:d="http://www.w3.org/2001/XMLSchema" ' + 
        'xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" ' + 
        'xmlns:v="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<v:Header />' +
        '<v:Body>' +
        '<n0:RetrieveUrlsRequest xmlns:n0="pluriform:pftokenframework:device">' + 
        '<n0:Device installation_id="c11bd7e9-ff47-4ca7-887d-3bfba3d34e61" device_id="000000000000000" manufacturer="unknown" model="sdk" resolution_x="720" resolution_y="1280" sdk_int="10" unique_id="ce1705cc680b1fde" />' +
        '</n0:RetrieveUrlsRequest>' +
        '</v:Body>' +
        '</v:Envelope>';
    
    
    xmlhttp.onreadystatechange = function () {
        //http://msdn.microsoft.com/en-us/library/windows/desktop/ms753702%28v=vs.85%29.aspx
        //http://msdn.microsoft.com/en-us/library/windows/desktop/ms767625%28v=vs.85%29.aspx
        if((xmlhttp.readyState === 4) && (xmlhttp.status === 200)) {
            parse(xmlhttp.xml);
        }
        
        setState('XMLHttpRequest is er klaar mee.' + xmlhttp.status);
    };
    
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.setRequestHeader('SOAPAction', 'https://www.pluriform.nl/xmlservices/PFTokenDevice/soap11/RetrieveUrls');
    xmlhttp.send(sr);
    setState('Send XMLHttpRequest');*/
}