document.addEventListener('DOMContentLoaded', function() {
    const photos = document.querySelectorAll('.photo');

    let isDragging = false;
    let currentPhoto = null;
    let initialX, initialY, xOffset = 0, yOffset = 0;
    let lastClickTime = 0;
    const doubleClickDelay = 300; 

    photos.forEach(photo => {
        const randomX = Math.random() * 10 - 5;
        const randomY = Math.random() * 10 - 5;
        photo.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${photo.style.getPropertyValue('--random-rotate') || 0}deg)`;

        // Start dragging
        photo.addEventListener('mousedown', dragStart);
        photo.addEventListener('touchstart', dragStart, { passive: false });

        // Handle click navigation
        photo.addEventListener('click', (e) => {
            if (!isDragging) { // Prevent accidental navigation while dragging
                const url = photo.getAttribute('data-url');
                if (url) {
                    window.open(url, '_blank'); // Open in a new tab
                }
            }
        });
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
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        const transform = window.getComputedStyle(currentPhoto).getPropertyValue('transform');
        const matrix = new DOMMatrix(transform);
        xOffset = matrix.m41;
        yOffset = matrix.m42;

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

        let currentX = e.type === "touchmove" ? e.touches[0].clientX - initialX : e.clientX - initialX;
        let currentY = e.type === "touchmove" ? e.touches[0].clientY - initialY : e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        const computedStyle = getComputedStyle(currentPhoto);
        const rotate = currentPhoto.style.getPropertyValue('--random-rotate') || computedStyle.getPropertyValue('--random-rotate') || 0;

        currentPhoto.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`;
    }

    function dragEnd() {
        isDragging = false;
    }
});
