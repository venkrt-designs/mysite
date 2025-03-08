function openWindow(windowName) {
    document.getElementById(windowName + '-window').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeWindow(windowName) {
    document.getElementById(windowName + '-window').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

<script>
document.body.style.background = "url('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExODh2aWhsOTJtcmI5bjBoeXk0YjdodTh5bzJiZDMxanN5ZWd2YzhmeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a692I53FP9XtvM4YCc/giphy.gif') no-repeat center center fixed";
document.body.style.backgroundSize = "cover";
</script>
