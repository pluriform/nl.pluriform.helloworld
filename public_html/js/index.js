function onDeviceReady() {
    document.addEventListener('menubutton', onMenuKeyDown, false);
}

function onInit () {
    document.addEventListener('deviceready', onDeviceReady, false);
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
      

