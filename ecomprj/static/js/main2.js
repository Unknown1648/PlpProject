(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top');
        } else {
            $('.nav-bar').removeClass('sticky-top');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    
    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });
    
})(jQuery);

//First Pop ups page

document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    var requestPopup = document.getElementById("requestPopup");
    const closeButtons = document.querySelectorAll('.close-request');

    // Open the modal when an image is clicked
    document.querySelectorAll('.triggerImage').forEach(function(image) {
        image.addEventListener('click', function(event) {
            event.preventDefault();
            var popupId = this.getAttribute('data-popup');
            var modal = document.getElementById(popupId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    // Close the modal when the close button is clicked
    document.querySelectorAll('.close2').forEach(function(closeButton) {
        closeButton.addEventListener('click', function() {
            var popupId = this.getAttribute('data-popup');
            var modal = document.getElementById(popupId);
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Open the request popup when any book button is clicked
    document.querySelectorAll('.bookButton').forEach(function(bookButton) {
        bookButton.addEventListener('click', function() {
            requestPopup.style.display = 'block';
        });
    });

    // Close the request popup when the close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Find the closest parent popup element
            const popup = button.closest('.popup');
            if (popup) {
                popup.style.display = 'none';
            }
        });
    });

    // Close the modal or request popup when clicking outside of them
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        } else if (event.target === requestPopup) {
            requestPopup.style.display = 'none';
        }
    });

    // Open the visit popup when any visit button is clicked
    document.querySelectorAll('.visitButton').forEach(function(visitButton) {
        visitButton.addEventListener('click', function() {
            visitPopup.style.display = 'block';
        });
    });

    // Close the visit popup when the close button is clicked
    if (closeRequestSpan) {
        closeRequestSpan.addEventListener('click', function() {
            visitPopup.style.display = 'none';
        });
    }

    // Close the modal or request popup when clicking outside of them
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        } else if (event.target === requestPopup) {
            requestPopup.style.display = 'none';
        } else if (event.target === visitPopup){
            visitPopup.style.display = 'none'
        }
    });
});

// Lightbox
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.close');
    const prevBtn = lightbox.querySelector('.prev');
    const nextBtn = lightbox.querySelector('.next');

    let currentIndex = 0;
    let images = [];
    let currentGridId = null;

    function openLightbox(gridId) {
        console.log('Opening lightbox for grid:', gridId); // Debug
        const grid = document.getElementById(gridId);
        if (!grid) return; // Check if grid exists

        images = Array.from(grid.querySelectorAll('a')).map(a => a.getAttribute('data-src'));
        console.log('Images:', images); // Debug
        if (images.length > 0) {
            currentIndex = 0;
            showImage(images[currentIndex]);
            lightbox.style.display = 'flex';
        }
    }

    function showImage(src) {
        lightboxImage.src = src;
    }

    function navigate(direction) {
        if (images.length === 0) return;
        currentIndex = (currentIndex + direction + images.length) % images.length;
        showImage(images[currentIndex]);
    }

    document.querySelectorAll('.image-grid a').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const gridId = event.target.closest('.image-grid').id;
            if (currentGridId !== gridId) {
                currentGridId = gridId;
                openLightbox(currentGridId);
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    prevBtn.addEventListener('click', () => {
        navigate(-1);
    });

    nextBtn.addEventListener('click', () => {
        navigate(1);
    });
});


{
    let allProperties = [];

    // Function to get query parameter value by name
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Function to update the URL by removing specific query parameters
    function updateURL() {
        const url = new URL(window.location.href);
        url.search = ''; // Clear all query parameters
        history.replaceState(null, '', url.toString());
    }

    // Function to initialize properties list
    function initializeProperties() {
        allProperties = Array.from(document.querySelectorAll('#propertyList .property-item'));
        filterProperties(); // Apply initial filters from URL
        updateURL(); // Remove URL parameters after filtering
    }

    // Function to apply filters to the properties list
    function filterProperties() {
        const keyword = document.getElementById('keywordInput') ? document.getElementById('keywordInput').value.toLowerCase() : '';
        const type = document.getElementById('propertyTypeSelect') ? document.getElementById('propertyTypeSelect').value.toLowerCase() : '';
        const location = document.getElementById('locationSelect') ? document.getElementById('locationSelect').value.toLowerCase() : '';
        const statusFilter = document.querySelector('.nav-pills .btn-outline-primary.active') ? document.querySelector('.nav-pills .btn-outline-primary.active').textContent.toLowerCase() : '';

        // Get the initial type filter from URL parameters
        const urlTypeFilter = getQueryParam('type') ? getQueryParam('type').toLowerCase() : '';

        // Reset the display of all properties
        allProperties.forEach(item => item.style.display = '');

        let anyVisible = false;

        allProperties.forEach(item => {
            const itemType = item.getAttribute('data-type') ? item.getAttribute('data-type').toLowerCase() : '';
            const itemLocation = item.getAttribute('data-location') ? item.getAttribute('data-location').toLowerCase() : '';
            const itemText = item.textContent.toLowerCase();
            const itemStatus = item.getAttribute('data-status') ? item.getAttribute('data-status').toLowerCase() : '';

            // Apply filters
            const matchesKeyword = keyword ? itemText.includes(keyword) : true;
            const matchesType = (urlTypeFilter ? itemType === urlTypeFilter : (type ? itemType === type : true));
            const matchesLocation = location ? itemLocation === location : true;
            const matchesStatus = statusFilter === 'featured' || itemStatus === statusFilter;

            if (matchesKeyword && matchesType && matchesLocation && matchesStatus) {
                item.style.display = ''; // Show item
                anyVisible = true;
            } else {
                item.style.display = 'none'; // Hide item
            }
        });

        // Show or hide the no results message
        const noResultsMessage = document.getElementById('noResults');
        if (anyVisible) {
            noResultsMessage.style.display = 'none';
        } else {
            noResultsMessage.style.display = 'block';
        }
    }

    // Event listener for search button
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the default button click behavior
            filterProperties();
        });
    }

    // Event listener for tab changes
    document.querySelectorAll('.nav-pills .nav-item a').forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the default anchor behavior
            document.querySelectorAll('.nav-pills .nav-item a').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterProperties(); // Reapply filters when tab is clicked
        });
    });

    // Event listeners for dropdown filters
    const typeSelect = document.getElementById('propertyTypeSelect');
    if (typeSelect) {
        typeSelect.addEventListener('change', filterProperties);
    }

    const locationSelect = document.getElementById('locationSelect');
    if (locationSelect) {
        locationSelect.addEventListener('change', filterProperties);
    }

    // Initialize properties when the page loads
    document.addEventListener('DOMContentLoaded', initializeProperties);
}

{
    // Function to redirect to the property list page with query parameters
    function redirectToPropertyList() {
        const keyword = document.getElementById('keywordInput') ? document.getElementById('keywordInput').value.trim() : '';
        const type = document.getElementById('propertyTypeSelect') ? document.getElementById('propertyTypeSelect').value : '';
        const location = document.getElementById('locationSelect') ? document.getElementById('locationSelect').value : '';
    
        // Construct the URL with query parameters
        let url = '/property-list.html';
        const params = new URLSearchParams();
    
        if (keyword) params.append('keyword', keyword);
        if (type) params.append('type', type);
        if (location) params.append('location', location);
    
        if (params.toString()) {
            url += '?' + params.toString();
        }
    
        // Redirect to the property list page with the query parameters
        window.location.href = url;
    }
    
    // Event listener for the search button
    document.getElementById('searchButton2').addEventListener('click', redirectToPropertyList);
}

//checkbox
{
    document.addEventListener('DOMContentLoaded', function() {
        const termsCheckbox = document.getElementById('termsCheckbox');
        const submitButton = document.getElementById('submitButton');

        termsCheckbox.addEventListener('change', function() {
            submitButton.disabled = !termsCheckbox.checked;
        });
    });
}