document.addEventListener('DOMContentLoaded', () => {
    const resultContainer = document.getElementById('resultContainer');
    const preloader = document.getElementById('preloader');
    const errorMessage = document.getElementById('error-message');

    function getRandomIdRange() {
        const isFirstRequest = Math.random() > 0.5;
        if (isFirstRequest) {
            return { min: 0, max: 250 };
        } else {
            return { min: 250, max: 500 };
        }
    }

    async function fetchData() {
        const { min, max } = getRandomIdRange();
        const url = `https://jsonplaceholder.typicode.com/comments?_start=${min}&_end=${max}`;

        try {
            preloader.style.display = 'block';
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Ошибка сети. Попробуйте позже.');
            }

            const data = await response.json();
            renderData(data);
        } catch (error) {
            console.error('Ошибка:', error);
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = `⚠ Что-то пошло не так: ${error.message}`;
        } finally {
            preloader.style.display = 'none';
        }
    }

    function renderData(data) {
        if (data.length === 0) {
            resultContainer.innerHTML = '<p>Нет данных для отображения.</p>';
        } else {
            const table = document.createElement('table');
            const header = document.createElement('thead');
            header.innerHTML = `
                <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Комментарий</th>
                </tr>
            `;
            table.appendChild(header);

            const tbody = document.createElement('tbody');
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.body}</td>
                `;
                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            resultContainer.innerHTML = '';
            resultContainer.appendChild(table);
        }
    }

    fetchData();
});
