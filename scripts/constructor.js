document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('tableForm');
    const resultContainer = document.getElementById('resultContainer');

    if (localStorage.getItem('tableSettings')) {
        const savedSettings = JSON.parse(localStorage.getItem('tableSettings'));
        document.getElementById('days').value = savedSettings.days;
        document.getElementById('maxLessons').value = savedSettings.maxLessons;
        document.getElementById('language').value = savedSettings.language;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const days = document.getElementById('days').value;
        const maxLessons = document.getElementById('maxLessons').value;
        const language = document.getElementById('language').value;

        const tableSettings = {
            days: days,
            maxLessons: maxLessons,
            language: language
        };
        localStorage.setItem('tableSettings', JSON.stringify(tableSettings));

        generateTable(days, maxLessons, language);
    });

    function generateTable(days, maxLessons, language) {
        const table = document.createElement('table');
        
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headerDay = document.createElement('th');
        headerDay.textContent = language === 'ru' ? 'День' : 'Day';
        headerRow.appendChild(headerDay);
        
        for (let i = 1; i <= maxLessons; i++) {
            const headerLesson = document.createElement('th');
            headerLesson.textContent = language === 'ru' ? 'Занятие ' + i : 'Lesson ' + i;
            headerRow.appendChild(headerLesson);
        }
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        let savedData = JSON.parse(localStorage.getItem('tableData')) || [];

        for (let i = 1; i <= days; i++) {
            const row = document.createElement('tr');
            const dayCell = document.createElement('td');
            dayCell.textContent = language === 'ru' ? 'День ' + i : 'Day ' + i;
            row.appendChild(dayCell);
            
            for (let j = 1; j <= maxLessons; j++) {
                const cell = document.createElement('td');
                const cellValue = savedData[i - 1] && savedData[i - 1][j - 1] ? savedData[i - 1][j - 1] : (language === 'ru' ? 'Тема ' + j : 'Topic ' + j);
                cell.setAttribute('contenteditable', 'true');
                cell.setAttribute('data-day', i);
                cell.setAttribute('data-lesson', j);
                cell.textContent = cellValue;
                row.appendChild(cell);
            }
            
            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        resultContainer.innerHTML = '';
        resultContainer.appendChild(table);

        const editableCells = resultContainer.querySelectorAll('td[contenteditable="true"]');
        editableCells.forEach(cell => {
            cell.addEventListener('blur', function () {
                const day = cell.getAttribute('data-day');
                const lesson = cell.getAttribute('data-lesson');
                const newValue = cell.textContent;

                saveTableData(day, lesson, newValue);
            });
        });
    }

    function saveTableData(day, lesson, value) {
        let tableData = JSON.parse(localStorage.getItem('tableData')) || [];
        
        if (!tableData[day - 1]) {
            tableData[day - 1] = [];
        }

        tableData[day - 1][lesson - 1] = value;

        localStorage.setItem('tableData', JSON.stringify(tableData));
    }
});
