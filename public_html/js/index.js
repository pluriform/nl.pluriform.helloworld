function onDeviceReady() {
    setState('Device ready..');
}

function onInit () {
    document.addEventListener('deviceready', onDeviceReady, false);
    document.addEventListener('menubutton', onMenuKeyDown, false);
}

function onMenuKeyDown () {
    setState('menu button clicked');
}

function onLoad () {
    setState('Load complete.');
}

function setState (message) {
    document.getElementById('state').innerHTML = message;
}