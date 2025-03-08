document.addEventListener('DOMContentLoaded', function () {
    const photos = document.querySelectorAll('.photo');
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

    const lightboxImg = document.createElement('img');
    lightbox.appendChild(lightboxImg);

    photos.forEach(photo => {
        photo.addEventListener('mouseenter', function () {
            const imgSrc = this.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'flex';
        });

        photo.addEventListener('mouseleave', function () {
            lightbox.style.display = 'none';
        });
    });
});
