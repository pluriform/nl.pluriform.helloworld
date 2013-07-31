function parse (xml, object) {    
    var array = [];
    
    var parser = new DOMParser ();
    var modelxml = parser.parseFromString (xml, 'text/xml');
    
    try {
        throw 4;
    }
    catch(exception) {
        
    }
    
    var resourcesxml = modelxml.getElementsByTagName (object.XML_MESSAGE);
    
    if(resourcesxml) {
       for (var i = 0; i < resourcesxml.length; i++) {
           var urlxml = resourcesxml[i];
           var url = {};
           for(var j = 0; j < object.XML_ATTRS.length; j++) {
               url[object.XML_ATTRS[j]] = urlxml.getAttribute(object.XML_ATTRS[j]);
           }

           array.push(url);
       }   
    }
    
    return array;
}

function retrieveUrls () {
    startLoad();
    //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://www.pluriform.nl/xmlservices/PFTokenDevice/soap11/RetrieveUrls');
    
    document.getElementById('state').innerHTML = 'xmlhttp.open';

    xmlhttp.onreadystatechange = function () {
        //http://msdn.microsoft.com/en-us/library/windows/desktop/ms753702%28v=vs.85%29.aspx
        //http://msdn.microsoft.com/en-us/library/windows/desktop/ms767625%28v=vs.85%29.aspx
        
        document.getElementById('state').innerHTML = 'onreadystatechange, xmlhttp.readyState: ' + xmlhttp.readyState + ', xmlhttp.status: ' + xmlhttp.status;
        
        /*if((xmlhttp.readyState === 4) && (xmlhttp.status === 200))*/ {
            //var urls = parse(xmlhttp.responseXML);
            var urls = parse(EXAMPLE_RetrieveUrlsResponse, PFTokenUrl);
            
            var response = '<table border="1">';

            for(var i = 0; i < urls.length; i++) {
                response += '<tr>';
                var url = urls[i];
                for (var prop in url) {
                    response += '<td>' + prop + '</td>';
                    response += '<td>' + url[prop] + '</td>';
                }
                response += '</tr>';
            }

            response += '</table>';
            document.getElementById('response').innerHTML = response;
        }
        
        stopLoad();
    };
    
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.setRequestHeader('SOAPAction', 'https://www.pluriform.nl/xmlservices/PFTokenDevice/soap11/RetrieveUrls');
    document.getElementById('state').innerHTML = 'xmlhttp.send';
    xmlhttp.send(EXAMPLE_RetrieveUrlsRequest);
    document.getElementById('state').innerHTML = 'xmlhttp.sent';
}

function startLoad () {
    document.getElementById('loading').setAttribute('style', 'display:block;');
}

function stopLoad () {
    document.getElementById('loading').setAttribute('style', 'display:none;');
}