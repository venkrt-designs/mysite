document.addEventListener('DOMContentLoaded', function() {
    // Get all portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const popupOverlay = document.getElementById('portfolio-popup');
    const popupClose = document.querySelector('.popup-close');
    const popupTitle = document.getElementById('popup-title');
    const popupImg = document.getElementById('popup-img');
    const popupDescription = document.getElementById('popup-description');
    
    // Add click event to each portfolio item
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get the data attributes
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            const imgSrc = this.querySelector('img').src;
            
            // Set the popup content
            popupTitle.textContent = title;
            popupImg.src = imgSrc;
            popupImg.alt = title;
            popupDescription.textContent = description;
            
            // Show the popup
            popupOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Disable scrolling
        });
    });
    
    // Close popup when clicking the X button
    popupClose.addEventListener('click', function() {
        popupOverlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close popup when clicking outside the window
    popupOverlay.addEventListener('click', function(event) {
        if (event.target === popupOverlay) {
            popupOverlay.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && popupOverlay.style.display === 'block') {
            popupOverlay.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
});
