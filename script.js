const cursor = document.getElementById('custom-cursor');

// Update cursor position
document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.pageX}px`;
    cursor.style.top = `${event.pageY}px`;
});

// Change cursor size when hovering over elements with the class "button"
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
    });
    link.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
    });
});

// Change cursor size when hovering over the image
const image = document.querySelector('.content img');
image.addEventListener('mouseenter', () => {
    cursor.style.width = '40px';
    cursor.style.height = '40px';
});
image.addEventListener('mouseleave', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
});
