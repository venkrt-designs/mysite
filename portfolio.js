document.addEventListener('DOMContentLoaded', function () {
    const photos = document.querySelectorAll('.photo');
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

    const lightboxImg = document.createElement('img');
    lightbox.appendChild(lightboxImg);

    // Open lightbox on click (mobile-friendly)
    photos.forEach(photo => {
        photo.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'flex';

            // Prevent scrolling when lightbox is open
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox when tapping outside the image
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';

            // Re-enable scrolling when lightbox is closed
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
        }
    });
});
