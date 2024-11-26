document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('tableForm');
    const resultContainer = document.getElementById('resultContainer');

    // Проверяем, есть ли сохраненные настройки в localStorage
    if (localStorage.getItem('tableSettings')) {
        const savedSettings = JSON.parse(localStorage.getItem('tableSettings'));
        document.getElementById('days').value = savedSettings.days;
        document.getElementById('maxLessons').value = savedSettings.maxLessons;
        document.getElementById('language').value = savedSettings.language;
    }

    // Обработка отправки формы
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const days = document.getElementById('days').value;
        const maxLessons = document.getElementById('maxLessons').value;
        const language = document.getElementById('language').value;

        // Сохраняем параметры в localStorage
        const tableSettings = {
            days: days,
            maxLessons: maxLessons,
            language: language
        };
        localStorage.setItem('tableSettings', JSON.stringify(tableSettings));

        // Генерируем таблицу
        generateTable(days, maxLessons, language);
    });

    // Функция генерации таблицы
    function generateTable(days, maxLessons, language) {
        let tableHTML = `<table><thead><tr><th>${language === 'ru' ? 'День' : 'Day'}</th>`;

        // Создаем заголовки для занятий
        for (let i = 1; i <= maxLessons; i++) {
            tableHTML += `<th>${language === 'ru' ? 'Занятие ' + i : 'Lesson ' + i}</th>`;
        }
        tableHTML += `</tr></thead><tbody>`;

        // Получаем сохраненные данные из localStorage, если они есть
        let savedData = JSON.parse(localStorage.getItem('tableData')) || [];

        // Создаем строки для каждого дня
        for (let i = 1; i <= days; i++) {
            tableHTML += `<tr><td>${language === 'ru' ? 'День ' + i : 'Day ' + i}</td>`;
            
            for (let j = 1; j <= maxLessons; j++) {
                const cellValue = savedData[i - 1] && savedData[i - 1][j - 1] ? savedData[i - 1][j - 1] : (language === 'ru' ? 'Тема ' + j : 'Topic ' + j);
                tableHTML += `<td contenteditable="true" data-day="${i}" data-lesson="${j}">${cellValue}</td>`;
            }
            
            tableHTML += `</tr>`;
        }

        tableHTML += `</tbody></table>`;
        resultContainer.innerHTML = tableHTML;

        // Добавляем обработчик событий для редактируемых ячеек
        const editableCells = resultContainer.querySelectorAll('td[contenteditable="true"]');
        editableCells.forEach(cell => {
            cell.addEventListener('blur', function () {
                const day = cell.getAttribute('data-day');
                const lesson = cell.getAttribute('data-lesson');
                const newValue = cell.textContent;

                // Сохраняем данные в localStorage
                saveTableData(day, lesson, newValue);
            });
        });
    }

    // Функция для сохранения данных в localStorage
    function saveTableData(day, lesson, value) {
        let tableData = JSON.parse(localStorage.getItem('tableData')) || [];
        
        // Если в массиве нет данных для дня, создаем новый
        if (!tableData[day - 1]) {
            tableData[day - 1] = [];
        }

        // Сохраняем значение в нужную ячейку
        tableData[day - 1][lesson - 1] = value;

        // Обновляем localStorage
        localStorage.setItem('tableData', JSON.stringify(tableData));
    }
});
