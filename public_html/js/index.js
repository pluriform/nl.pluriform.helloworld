function onDeviceReady() {
    alert('onDeviceReady');
}

function onInit () {
    alert('onInit');
    document.addEventListener('deviceready', onDeviceReady, false);
    document.addEventListener('menubutton', onMenuKeyDown, false);
}

function onMenuKeyDown () {
    alert('onMenuKeyDown');
    setState('menu button clicked');
}

function onLoad () {
    alert('onLoad');
    setState('Load complete.');
}

function setState (message) {
    document.getElementById('state').innerHTML = message;
}
      

