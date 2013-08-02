var DEBUG = true;

var PFTokenUrl = {
    'XML_MESSAGE' : 'PFTokenUrl',
    'XML_ATTR_NAME' : 'name',
    'XML_ATTR_HOST' : 'host',
    'XML_ATTR_PATH' : 'path',
    'XML_ATTRS' : []
};
PFTokenUrl.XML_ATTRS = [PFTokenUrl.XML_ATTR_NAME, PFTokenUrl.XML_ATTR_HOST, PFTokenUrl.XML_ATTR_PATH];

var PFToken = {
    'XML_MESSAGE' : 'RequestTokenResponse',
    'XML_ATTR_TOKEN' : 'token',
    'XML_ATTRS' : []
};
PFToken.XML_ATTRS = [PFToken.XML_ATTR_TOKEN];

var retrieveUrlsRequest = function () {
    var dev = getDevice();
    
    if(DEBUG) {
        dev.installation_id = 'eb67b432-42fa-49e7-97c8-0c7833290cd2';
        dev.device_id = '';
        dev.manufacturer = 'Sony';
        dev.model = 'SGP311';
        dev.sdk_int = '16';
        dev.unique_id = 'e0e15c41ef28a432';
    }
        
    return '<?xml version="1.0" encoding="utf-8"?>' +
            '<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" ' +
                'xmlns:d="http://www.w3.org/2001/XMLSchema" ' +
                'xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" ' +
                'xmlns:v="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<v:Header />' +
                '<v:Body>' +
                    '<n0:RetrieveUrlsRequest xmlns:n0="pluriform:pftokenframework:device">' +
                        '<n0:Device installation_id="' + dev.installation_id + 
                        '" device_id="' + dev.device_id + 
                        '" manufacturer="' + dev.manufacturer + 
                        '" model="' + dev.model + 
                        '" resolution_x="' + window.innerWidth + 
                        '" resolution_y="' + window.innerHeight + 
                        '" sdk_int="' + dev.sdk_int + 
                        '" unique_id="' + dev.unique_id + '" />' +
                    '</n0:RetrieveUrlsRequest>' +
                '</v:Body>' +
            '</v:Envelope>';
}

var EXAMPLE_RetrieveUrlsRequest = retrieveUrlsRequest();

var EXAMPLE_RetrieveUrlsResponse = '<?xml version="1.0" encoding="utf-8"?>' +
        '<soapenv11:Envelope xmlns:soapenv11="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<soapenv11:Body>' +
            '<pftoken-device:RetrieveUrlsResponse xmlns:pftoken-device="pluriform:pftokenframework:device">' +
                '<pftoken-device:PFTokenUrls>' +
                    '<pftoken-device:PFTokenUrl name="Community" host="www.pluriform.nl" path="/xmlservices/" />' +
                    '<pftoken-device:PFTokenUrl name="van extel" host="pc-kve.pluriform.lan" path="/android/xmlservices/" />' +
                '</pftoken-device:PFTokenUrls>' +
            '</pftoken-device:RetrieveUrlsResponse>' +
        '</soapenv11:Body>' +
        '</soapenv11:Envelope>';

var EXAMPLE_RequestTokenRequest = '<?xml version="1.0" encoding="utf-8"?>' + 
        '<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" ' + 
            'xmlns:d="http://www.w3.org/2001/XMLSchema" ' + 
            'xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" ' + 
            'xmlns:v="http://schemas.xmlsoap.org/soap/envelope/">' + 
        '<v:Header />' + 
            '<v:Body>' + 
                '<n0:RequestTokenRequest xmlns:n0="pluriform:pftokenframework:public">' + 
                    '<n0:Device installation_id="eb67b432-42fa-49e7-97c8-0c7833290cd2" device_id="" manufacturer="Sony" model="SGP311" resolution_x="1920" resolution_y="1128" sdk_int="16" unique_id="e0e15c41ef28a432" />' + 
                '</n0:RequestTokenRequest>' + 
            '</v:Body>' + 
        '</v:Envelope>';

var EXAMPLE_RequestTokenResponse = '<?xml version="1.0" encoding="utf-8"?>' +
        '<soapenv11:Envelope xmlns:soapenv11="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<soapenv11:Body>' +
                '<pftoken:RequestTokenResponse xmlns:pftoken="pluriform:pftokenframework:public" token="9820 0220" />' +
            '</soapenv11:Body>' +
        '</soapenv11:Envelope>';