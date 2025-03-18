function openWindow(windowName) {
    document.getElementById(windowName + '-window').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeWindow(windowName) {
    document.getElementById(windowName + '-window').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const windows = document.querySelectorAll('[id$="-window"]');
    windows.forEach(window => {
        window.addEventListener('touchend', function (event) {
            if (event.target === window) {
                closeWindow(window.id.replace('-window', ''));
            }
        });
    });
});
