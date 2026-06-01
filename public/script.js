document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const categoryButtonsContainer = document.getElementById('category-buttons');
    let allScheduleItems = []; // To store all fetched schedule items

    async function fetchSchedule() {
        try {
            const response = await fetch('/api/schedule');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allScheduleItems = await response.json();
            renderSchedule(allScheduleItems);
            renderCategoryFilters(allScheduleItems);
        } catch (error) {
            console.error('Error fetching schedule:', error);
            scheduleContainer.innerHTML = '<p>Error loading schedule. Please try again later.</p>';
        }
    }

    function renderSchedule(scheduleToRender) {
        scheduleContainer.innerHTML = ''; // Clear previous schedule
        scheduleToRender.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('schedule-item');
            itemElement.classList.add(item.type); // Add talk, break, or transition class

            let content = '';
            if (item.type === 'talk') {
                content = `
                    <span class="time">${item.startTime} - ${item.endTime}</span>
                    <h3>${item.title}</h3>
                    <p class="speakers">Speaker(s): ${item.speakers.join(', ')}</p>
                    <p>${item.description}</p>
                    <p class="category">${item.category.map(cat => `<span>${cat}</span>`).join('')}</p>
                `;
            } else if (item.type === 'break') {
                content = `
                    <span class="time">${item.startTime} - ${item.endTime}</span>
                    <h3>${item.title}</h3>
                    <p>Enjoy your ${item.duration} minute break!</p>
                `;
            } else if (item.type === 'transition') {
                content = `
                    <span class="time">${item.startTime} - ${item.endTime}</span>
                    <h3>${item.title}</h3>
                    <p>${item.duration} minutes</p>
                `;
            }
            itemElement.innerHTML = content;
            scheduleContainer.appendChild(itemElement);
        });
    }

    function renderCategoryFilters(scheduleData) {
        const categories = new Set();
        scheduleData.forEach(item => {
            if (item.type === 'talk' && item.category) {
                item.category.forEach(cat => categories.add(cat));
            }
        });

        // Add filter buttons for each unique category
        categories.forEach(category => {
            const button = document.createElement('button');
            button.classList.add('filter-btn');
            button.dataset.category = category.toLowerCase();
            button.textContent = category;
            categoryButtonsContainer.appendChild(button);
        });

        // Add event listener to category buttons container
        categoryButtonsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('filter-btn')) {
                // Remove active class from all buttons
                categoryButtonsContainer.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Add active class to the clicked button
                event.target.classList.add('active');

                const selectedCategory = event.target.dataset.category;
                filterSchedule(selectedCategory);
            }
        });
    }

    function filterSchedule(selectedCategory) {
        if (selectedCategory === 'all') {
            renderSchedule(allScheduleItems);
        } else {
            const filteredItems = allScheduleItems.filter(item =>
                item.type === 'talk' && item.category &&
                item.category.map(cat => cat.toLowerCase()).includes(selectedCategory)
            );
            renderSchedule(filteredItems);
        }
    }

    // Initial fetch and render
    fetchSchedule();
});
