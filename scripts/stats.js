(function() {
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        const loadTimeElement = document.getElementById('load-time');
        
        const statsText = `Время загрузки страницы: ${loadTime.toFixed(0)} мс`;

        loadTimeElement.textContent = statsText;
    });
})();

const menuLinks = document.querySelectorAll('nav ul li a');

    const currentPage = window.location.pathname;

    menuLinks.forEach(link => {
        if (link.href.includes(currentPage)) {
            link.classList.add('active');
        }
    });