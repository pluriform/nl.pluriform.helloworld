var EXAMPLE_RetrieveUrlsRequest =
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" ' +
            'xmlns:d="http://www.w3.org/2001/XMLSchema" ' + 
            'xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" ' + 
            'xmlns:v="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<v:Header />' +
            '<v:Body>' +
            '<n0:RetrieveUrlsRequest xmlns:n0="pluriform:pftokenframework:device">' + 
                '<n0:Device installation_id="c11bd7e9-ff47-4ca7-887d-3bfba3d34e61" ' + 
                    'device_id="000000000000000" ' + 
                    'manufacturer="unknown"' + 
                    'model="sdk"' + 
                    'resolution_x="720"' + 
                    'resolution_y="1280"' + 
                    'sdk_int="10"' + 
                    'unique_id="ce1705cc680b1fde" />' +
                '</n0:RetrieveUrlsRequest>' +
            '</v:Body>' +
        '</v:Envelope>';

var EXAMPLE_RetrieveUrlsResponse = 
        '<?xml version="1.0" encoding="utf-8"?>' +
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