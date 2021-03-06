function _getElement (id) {
    return document.getElementById(id);
}

function _httpRequest (url, xml, callback, resultxml) {
    startLoad();
    //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', url);

    xmlhttp.onreadystatechange = function () {
        stopLoad();
        
        //http://msdn.microsoft.com/en-us/library/windows/desktop/ms753702%28v=vs.85%29.aspx
        //http://msdn.microsoft.com/en-us/library/windows/desktop/ms767625%28v=vs.85%29.aspx
        if(DEBUG || (xmlhttp.readyState === 4) && (xmlhttp.status === 200)) {
            callback((xmlhttp.responseText || ((DEBUG) ? resultxml : null)));
        }
        else {
            alert('XMLHttpRequest failed!' + '\n' +
                '- state [' + xmlhttp.readyState + ']\n' +
                '- status [' + (xmlhttp.statusText || xmlhttp.status) + ']');
        }
    };
    
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.setRequestHeader('SOAPAction', url);
    xmlhttp.send(xml);
}

var _onRetrieveToken = function (xml) {
    var token = _parseXMLToObject(xml, PFToken)[0];
    alert('token = ' + token[PFToken.XML_ATTR_TOKEN]);
};

var _onRetrieveUrls = function (xml) {
    var urls = _parseXMLToObject(xml, PFTokenUrl);
    var elt = dataElement();

    for (var i = 0; i < urls.length; i++) {
        var btn = document.createElement ('button');
        btn.innerText = urls[i][PFTokenUrl.XML_ATTR_NAME];
        btn.onclick = (function (idx) {
            return function () {
                retrieveToken (urls[idx]);
            };
        }) (i);
        elt.appendChild (btn);
    }
};

function _parseXMLToObject (xml, object) {    
    var array = [];

    if(xml) {
        var parser = new DOMParser ();
        var modelxml = parser.parseFromString (xml, 'text/xml');
        var resourcesxml = modelxml.getElementsByTagName (object.XML_MESSAGE);

        if(resourcesxml) {
            for (var i = 0; i < resourcesxml.length; i++) {
                var objectxml = resourcesxml[i];
                var obj = {};
                for(var j = 0; j < object.XML_ATTRS.length; j++) {
                    obj[object.XML_ATTRS[j]] = objectxml.getAttribute(object.XML_ATTRS[j]);
                }
                array.push(obj);
             }
        }
    }
    return array;
}

function dataElement () {
    return _getElement('data');
}

function _onDeviceReady () {
    DEBUG = false;
    var dev = getDevice ();
    dev.installation_id = 'eb67b432-42fa-49e7-97c8-0c7833290cd2';
    dev.device_id = '';
    dev.manufacturer = '';
    dev.model = '';
    dev.sdk_int = '';
    dev.unique_id = device.uuid;
    
    var elt = _getElement('phonegap');
    elt.innerText = 'PhoneGap: ready, connection: ' + navigator.network.connection.type;
}

function printObject (object) {
    var result = "";
    var first = true;
    
    result = "object {";
    
    if(object) {    
        for(var property in object) {
            if(!first)
                result += ", ";
            
            result += "'" + property + "' : '" + object[property] + "'";
            
            first = false;
        }
    }
    else
        result += 'undefined';
    
    result += "};";
    
    return result;
}

function retrieveToken (url) {
    var uri = 'https://' + url[PFTokenUrl.XML_ATTR_HOST] + url[PFTokenUrl.XML_ATTR_PATH] + 'PFToken-Device/soap11/RequestToken';
    _httpRequest(uri, EXAMPLE_RequestTokenRequest, _onRetrieveToken, EXAMPLE_RequestTokenResponse);
}

function retrieveUrls () {
    elt = dataElement().innerText = '';
        
    _httpRequest('https://www.pluriform.nl/xmlservices/PFTokenDevice/soap11/RetrieveUrls', EXAMPLE_RetrieveUrlsRequest, _onRetrieveUrls, EXAMPLE_RetrieveUrlsResponse);
}

function startLoad () {
    _getElement('loading').setAttribute('style', 'display:block;');
}

function stopLoad () {
    _getElement('loading').setAttribute('style', 'display:none;');
}

function updateState (text) {
    _getElement('state').innerText += text + '\n';
}