function openWindow(windowName) {
    document.getElementById(windowName + '-window').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeWindow(windowName) {
    document.getElementById(windowName + '-window').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}