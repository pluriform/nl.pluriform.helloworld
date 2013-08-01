function _httpRequest (url, xml, callback, resultxml) {
    startLoad();
    //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', url);

    update('_httpRequest open');
    
    xmlhttp.onreadystatechange = function () {
        update('_httpRequest onreadystatechange');
        //http://msdn.microsoft.com/en-us/library/windows/desktop/ms753702%28v=vs.85%29.aspx
        //http://msdn.microsoft.com/en-us/library/windows/desktop/ms767625%28v=vs.85%29.aspx
        if(DEBUG || (xmlhttp.readyState === 4) && (xmlhttp.status === 200)) {
            update('_httpRequest before callback');
            callback((xmlhttp.responseText || ((DEBUG) ? resultxml : null)));
            update('_httpRequest after callback');
        }
        else {
            update('_httpRequest failed');
            alert('XMLHttpRequest failed!' + '\n' +
                '- state [' + xmlhttp.readyState + ']\n' +
                '- status [' + (xmlhttp.statusText || xmlhttp.status) + ']');
        }
            
        stopLoad();
    };
    
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.setRequestHeader('SOAPAction', url);
    update('_httpRequest send');
    xmlhttp.send(xml);
    update('_httpRequest sent');
}

var _onRetrieveToken = function (xml) {
    var token = _parseXMLToObject(xml, PFToken)[0];
    alert('token = ' + token[PFToken.XML_ATTR_TOKEN]);
};

var _onRetrieveUrls = function (xml) {
    var urls = _parseXMLToObject(xml, PFTokenUrl);
    var elt = document.getElementById('response');

    for (var i = 0; i < urls.length; i++) {
        var btn = document.createElement ('button');
        btn.innerText = urls[i][PFTokenUrl.XML_ATTR_NAME];
        btn.onclick = (function (idx) {
            return function () {
                retrieveToken (urls[idx]);
            };
        }) (i);
        elt.appendChild (btn);
        update('button added');
    }
};

function _parseXMLToObject (xml, object) {    
    var array = [];
    
    update('_parseXMLToObject begin');
    
    if(xml) {
        update('_parseXMLToObject xml');
        var parser = new DOMParser ();
        var modelxml = parser.parseFromString (xml, 'text/xml');
        var resourcesxml = modelxml.getElementsByTagName (object.XML_MESSAGE);

        if(resourcesxml) {
            update('_parseXMLToObject resourcesxml ' + resourcesxml);
            update('_parseXMLToObject resourcesxml ' + resourcesxml.length);
            update('_parseXMLToObject resourcesxml ' + printObject(resourcesxml));
            for (var i = 0; i < resourcesxml.length; i++) {
                update('_parseXMLToObject obj');
                var objectxml = resourcesxml[i];
                var obj = {};
                for(var j = 0; j < object.XML_ATTRS.length; j++) {
                    update('_parseXMLToObject XML_ATTRS');
                    obj[object.XML_ATTRS[j]] = objectxml.getAttribute(object.XML_ATTRS[j]);
                }
                array.push(obj);
             }
        }
    }
    
    update('_parseXMLToObject end');
    
    return array;
}

function onDeviceReady () {
    DEBUG = false;
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
    _httpRequest('https://www.pluriform.nl/xmlservices/PFTokenDevice/soap11/RetrieveUrls', EXAMPLE_RetrieveUrlsRequest, _onRetrieveUrls, EXAMPLE_RetrieveUrlsResponse);
}

function startLoad () {
    document.getElementById('loading').setAttribute('style', 'display:block;');
}

function stopLoad () {
    document.getElementById('loading').setAttribute('style', 'display:none;');
}

function update (text) {
    document.getElementById('state').innerText += text + '\n';
}