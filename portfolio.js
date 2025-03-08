document.addEventListener('DOMContentLoaded', function () {
    const photos = document.querySelectorAll('.photo');
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

    const lightboxImg = document.createElement('img');
    lightbox.appendChild(lightboxImg);

    // Open lightbox on click (works for mobile too)
    photos.forEach(photo => {
        photo.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Disable background scrolling
        });
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
});
