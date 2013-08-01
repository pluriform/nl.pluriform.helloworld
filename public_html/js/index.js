var _onRetrieveToken = function () {
    alert('retrieve token');
}

var _onRetrieveUrls = function (xml) {
    var urls = parseXMLToObject(xml, PFTokenUrl);
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
    }
}

function parseXMLToObject (xml, object) {    
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
    alert('https://' + url[PFTokenUrl.XML_ATTR_HOST] + url[PFTokenUrl.XML_ATTR_PATH]);
}

function retrieveUrls () {
    startLoad();
    //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    
    var xmlhttp = new XMLHttpRequest();
    var url = 'https://www.pluriform.nl/xmlservices/PFTokenDevice/soap11/RetrieveUrls';
    xmlhttp.open('POST', url);

    xmlhttp.onreadystatechange = function () {
        //http://msdn.microsoft.com/en-us/library/windows/desktop/ms753702%28v=vs.85%29.aspx
        //http://msdn.microsoft.com/en-us/library/windows/desktop/ms767625%28v=vs.85%29.aspx
        if(DEBUG || (xmlhttp.readyState === 4) && (xmlhttp.status === 200)) {
            _onRetrieveUrls((DEBUG) ? EXAMPLE_RetrieveUrlsResponse : xmlhttp.responseXML);
        }
        else {
            alert('XMLHttpRequest failed!' + '\n' +
                '- state [' + xmlhttp.readyState + ']\n' +
                '- status [' + (xmlhttp.statusText || xmlhttp.status) + ']');
        }
            
        stopLoad();
    }

    //xmlhttp.onreadystatechange = _onRetrieveUrls;
    /*function () {
        //http://msdn.microsoft.com/en-us/library/windows/desktop/ms753702%28v=vs.85%29.aspx
        //http://msdn.microsoft.com/en-us/library/windows/desktop/ms767625%28v=vs.85%29.aspx
        
        if(DEBUG || (xmlhttp.readyState === 4) && (xmlhttp.status === 200)) {
            var urls = parseXMLToObject(((DEBUG) ? EXAMPLE_RetrieveUrlsResponse : xmlhttp.responseXML), PFTokenUrl);
            
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
            }
        }
        else {
            alert('XMLHttpRequest failed!' + '\n' +
                '- state [' + xmlhttp.readyState + ']\n' +
                '- status [' + (xmlhttp.statusText || xmlhttp.status) + ']');
        }
        
        stopLoad();
    };*/
    
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.setRequestHeader('SOAPAction', url);
    xmlhttp.send(EXAMPLE_RetrieveUrlsRequest);
}

function startLoad () {
    document.getElementById('loading').setAttribute('style', 'display:block;');
}

function stopLoad () {
    document.getElementById('loading').setAttribute('style', 'display:none;');
}