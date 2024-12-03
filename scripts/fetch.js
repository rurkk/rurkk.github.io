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
            resultContainer.innerHTML = ''; // Clear any previous content
    
            data.forEach(item => {
                const commentCard = document.createElement('div');
                commentCard.classList.add('comment-card');
                
                const cardHeader = document.createElement('div');
                cardHeader.classList.add('comment-card-header');
                cardHeader.innerHTML = `
                    <strong>${item.name}</strong> 
                    <span class="comment-email">(${item.email})</span>
                `;
    
                const cardBody = document.createElement('div');
                cardBody.classList.add('comment-card-body');
                cardBody.innerHTML = `
                    <p>${item.body}</p>
                `;
    
                commentCard.appendChild(cardHeader);
                commentCard.appendChild(cardBody);
    
                resultContainer.appendChild(commentCard);
            });
        }
    }

    fetchData();
});
