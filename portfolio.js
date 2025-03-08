document.addEventListener('DOMContentLoaded', function () {
    const photos = document.querySelectorAll('.photo');
    let lastClickTime = 0;
    const doubleClickDelay = 300; // ms delay for double click

    photos.forEach(photo => {
        photo.addEventListener('click', function (e) {
            const currentTime = new Date().getTime();
            if (currentTime - lastClickTime < doubleClickDelay) {
                // Double click detected - open link
                const url = photo.getAttribute('data-url');
                if (url) {
                    window.open(url, '_blank');
                }
                return;
            }
            lastClickTime = currentTime;
        });
    });
});
