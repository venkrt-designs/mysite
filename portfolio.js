document.addEventListener('DOMContentLoaded', function () {
    const photos = document.querySelectorAll('.photo');
    let isDragging = false;
    let startX, startY, initialX, initialY, xOffset = 0, yOffset = 0;
    let currentPhoto = null;
    let lastClickTime = 0;
    const doubleClickDelay = 300; // ms delay for double click

    photos.forEach(photo => {
        photo.addEventListener('mousedown', dragStart);
        photo.addEventListener('touchstart', dragStart, { passive: false });
        photo.addEventListener('click', handleClick);
    });

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);

    function dragStart(e) {
        isDragging = false;
        currentPhoto = e.target.closest('.photo');
        if (!currentPhoto) return;

        const allPhotos = document.querySelectorAll('.photo');
        allPhotos.forEach(p => p.style.zIndex = "1");
        currentPhoto.style.zIndex = "100";

        if (e.type === "touchstart") {
            e.preventDefault();
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            startX = e.clientX;
            startY = e.clientY;
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        document.addEventListener('mousemove', setDragging);
        document.addEventListener('touchmove', setDragging, { passive: false });
    }

    function setDragging() {
        isDragging = true;
        document.removeEventListener('mousemove', setDragging);
        document.removeEventListener('touchmove', setDragging);
    }

    function drag(e) {
        if (!isDragging || !currentPhoto) return;
        e.preventDefault();

        let currentX, currentY;
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        currentPhoto.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }

    function dragEnd(e) {
        if (!isDragging) {
            handleClick(e);
        }
        isDragging = false;
    }

    function handleClick(e) {
        if (isDragging) return;

        const photo = e.target.closest('.photo');
        if (!photo) return;

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
    }
});
