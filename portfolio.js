document.addEventListener('DOMContentLoaded', function () {
    const photos = document.querySelectorAll('.photo');
    
    // Create Lightbox
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

    // Create Image Element for Lightbox
    const lightboxImg = document.createElement('img');
    lightbox.appendChild(lightboxImg);

    // Create Close (X) Button
    const closeButton = document.createElement('div');
    closeButton.classList.add('close-btn');
    closeButton.innerHTML = '✖'; // Unicode for X symbol
    lightbox.appendChild(closeButton);

    // Open lightbox when clicking an image
    photos.forEach(photo => {
        photo.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'flex';

            // Disable scrolling when lightbox is open
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox when clicking X button
    closeButton.addEventListener('click', function () {
        lightbox.style.display = 'none';

        // Re-enable scrolling when lightbox is closed
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';

            // Re-enable scrolling
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
        }
    });
});
