document.addEventListener('DOMContentLoaded', function() {
    // Get all photo elements
    const photos = document.querySelectorAll('.photo');
    
    // Variables for dragging
    let isDragging = false;
    let currentPhoto = null;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    let lastClickTime = 0;
    const doubleClickDelay = 300; // ms delay for double click
    
    // Initialize each photo with listeners
    photos.forEach(photo => {
        // Set initial random positions slightly differently than in CSS
        // This creates a more natural scattered look
        const randomX = Math.random() * 10 - 5;
        const randomY = Math.random() * 10 - 5;
        photo.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${photo.style.getPropertyValue('--random-rotate') || 0}deg)`;
        
        // Mouse down event - start dragging
        photo.addEventListener('mousedown', dragStart);
        
        // Touch start event for mobile
        photo.addEventListener('touchstart', dragStart, { passive: false });
    });
    
    // Document-level event listeners for dragging
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
    
    // Drag start function
    function dragStart(e) {
        // Bring the photo to the front
        const allPhotos = document.querySelectorAll('.photo');
        allPhotos.forEach(p => {
            p.style.zIndex = "1";
        });
        
        const target = e.target.closest('.photo');
        if (!target) return;
        
        target.style.zIndex = "100";
        
        // Check for double click
        const currentTime = new Date().getTime();
        if (currentTime - lastClickTime < doubleClickDelay) {
            // Double click detected - navigate to URL
            const url = target.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
            return;
        }
        
        lastClickTime = currentTime;
        
        // Get starting position
        currentPhoto = target;
        
        if (e.type === "touchstart") {
            e.preventDefault(); // Prevent scrolling on touch devices
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
        
        // Get current transform values
        const transform = window.getComputedStyle(currentPhoto).getPropertyValue('transform');
        const matrix = new DOMMatrix(transform);
        xOffset = matrix.m41;
        yOffset = matrix.m42;
        
        isDragging = true;
    }
    
    // Drag function
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
        
        // Get the rotation from CSS variable
        const computedStyle = getComputedStyle(currentPhoto);
        const rotate = currentPhoto.style.getPropertyValue('--random-rotate') || 
                      computedStyle.getPropertyValue('--random-rotate') || 0;
        
        // Apply transform with both translation and rotation
        currentPhoto.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`;
    }
    
    // Drag end function
    function dragEnd() {
        initialX = xOffset;
        initialY = yOffset;
        isDragging = false;
    }
});