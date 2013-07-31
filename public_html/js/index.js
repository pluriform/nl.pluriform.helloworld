function parse (xml) {    
    var parser = new DOMParser ();
    var modelxml = parser.parseFromString (xml, 'text/xml');
    var resourcesxml = modelxml.getElementsByTagName ('PFTokenUrl');

    var pftokenurls = [];

    for (var i = 0; i < resourcesxml.length; i++) {
        var url = resourcesxml[i];
        
        pftokenurls.push({'name' : url.getAttribute('name'),
        'host' : url.getAttribute('host'),
        'path' : url.getAttribute('path')});
    }
    
    return pftokenurls;
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
        
        if((xmlhttp.readyState === 4) && (xmlhttp.status === 200)) {
            alert(xmlhttp.responseXML);
            var urls = parse(xmlhttp.responseXML);
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