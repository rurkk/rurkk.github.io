(function() {
    window.addEventListener('load', function() {
        // Получаем время загрузки с использованием performance.now()
        const loadTime = performance.now();  // Возвращает время с момента начала загрузки страницы

        // Находим элемент для вывода времени загрузки
        const loadTimeElement = document.getElementById('load-time');
        
        // Создаем текст для вывода
        const statsText = `Время загрузки страницы: ${loadTime.toFixed(0)} мс`; // Округляем до целых

        // Добавляем текст в элемент
        loadTimeElement.textContent = statsText; // Выводим результат в контейнер
    });
})();

const menuLinks = document.querySelectorAll('nav ul li a');

    const currentPage = window.location.pathname;

    menuLinks.forEach(link => {
        if (link.href.includes(currentPage)) {
            link.classList.add('active');
        }
    });