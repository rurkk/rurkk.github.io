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
            errorMessage.textContent = `⚠ Что-то пошло не так: ${error.message}`;
        } finally {
            preloader.style.display = 'none';
        }
    }

    function renderData(data) {
        resultContainer.innerHTML = '';

        if (data.length === 0) {
            const noDataMessage = document.createElement('p');
            noDataMessage.textContent = 'Нет данных для отображения.';
            resultContainer.appendChild(noDataMessage);
        } else {
            data.forEach(item => {
                const commentCard = document.createElement('div');
                commentCard.classList.add('comment-card');
                
                const cardHeader = document.createElement('div');
                cardHeader.classList.add('comment-card-header');
                const headerStrong = document.createElement('strong');
                headerStrong.textContent = item.name;
                const headerEmail = document.createElement('span');
                headerEmail.classList.add('comment-email');
                headerEmail.textContent = ` (${item.email})`;
                cardHeader.appendChild(headerStrong);
                cardHeader.appendChild(headerEmail);
    
                const cardBody = document.createElement('div');
                cardBody.classList.add('comment-card-body');
                const bodyParagraph = document.createElement('p');
                bodyParagraph.textContent = item.body;
                cardBody.appendChild(bodyParagraph);
    
                commentCard.appendChild(cardHeader);
                commentCard.appendChild(cardBody);
    
                resultContainer.appendChild(commentCard);
            });
        }
    }

    fetchData();
});
