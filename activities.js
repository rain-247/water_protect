document.addEventListener("DOMContentLoaded", function() {
    const eventContainer = document.querySelector(".event-container");
    let registeredEvents = JSON.parse(localStorage.getItem("registeredEvents")) || [];

    function openPopup(contentHtml) {
        const popup = document.createElement("div");
        popup.classList.add("popup-overlay", "active");
        popup.innerHTML = `
            <div class="popup-content">
                ${contentHtml}
                <button class="close-popup">關閉</button>
            </div>
        `;
        document.body.appendChild(popup);
        
        document.querySelector(".close-popup").addEventListener("click", function() {
            popup.remove();
        });
    }

    function openRegistrationForm(eventId, eventTitle) {
        const contentHtml = `
            <h2>報名活動 - ${eventTitle}</h2>
            <form id="popup-event-form">
                <label for="popup-name">姓名：</label>
                <input type="text" id="popup-name" required>
                
                <label for="popup-email">電子郵件：</label>
                <input type="email" id="popup-email" required>
                
                <button type="submit">提交報名</button>
            </form>
        `;
        openPopup(contentHtml);

        document.getElementById("popup-event-form").addEventListener("submit", function(e) {
            e.preventDefault();
            const name = document.getElementById("popup-name").value;
            const email = document.getElementById("popup-email").value;

            registeredEvents.push({ id: eventId, title: eventTitle, name, email });
            localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents));
            alert("報名成功！");
            document.querySelector(".popup-overlay").remove();
        });
    }

    function openDescriptionPopup(event) {
        const contentHtml = `
            <h2>${event.title}</h2>
            <img src="${event.image}" alt="活動圖片" class="popup-image">
            <p>${event.description}</p>
        `;
        openPopup(contentHtml);
    }

    function renderEvents() {
        eventContainer.innerHTML = "";
        let events = [
            { id: 1, title: "清潔河川志工日", date: "2025-04-15", location: "台北市大安溪", description: "參與志工活動，幫助清理河川垃圾，改善水質！", image: "./img/img1.webp" },
            { id: 2, title: "節水教育講座", date: "2025-05-10", location: "高雄環保教育中心", description: "學習如何在日常生活中有效節約用水的方法。", image: "./img/img2.webp" },
            { id: 3, title: "水資源探訪之旅", date: "2025-06-20", location: "新竹水庫", description: "了解台灣水資源的分布與挑戰，探索水庫的運作方式。", image: "./img/img3.webp" },
            { id: 4, title: "生態濕地保育日", date: "2025-07-05", location: "宜蘭濕地", description: "體驗濕地生態，參與保育行動，學習自然共存的方法。", image: "./img/img4.webp" },
            { id: 5, title: "水質檢測與環境教育", date: "2025-08-12", location: "台南水質檢測中心", description: "實際動手測試水質，了解水污染與水資源保護的知識。", image: "./img/img5.webp" },
            { id: 6, title: "雨水回收DIY工作坊", date: "2025-09-18", location: "台中創客中心", description: "學習如何設計與製作簡單的雨水回收系統，推廣環保理念。", image: "./img/img6.webp" }
        ];

        events.forEach(event => {
            const eventElement = document.createElement("div");
            eventElement.classList.add("event-item");
            eventElement.innerHTML = `
                <h3>${event.title}</h3>
                <p><strong>日期：</strong>${event.date}</p>
                <p><strong>地點：</strong>${event.location}</p>
                <button class="detail-btn" data-id="${event.id}">詳細說明</button>
                <button class="register-btn" data-id="${event.id}" data-title="${event.title}">報名</button>
            `;
            eventContainer.appendChild(eventElement);
        });

        document.querySelectorAll(".register-btn").forEach(button => {
            button.addEventListener("click", function() {
                const eventId = this.dataset.id;
                const eventTitle = this.dataset.title;
                openRegistrationForm(eventId, eventTitle);
            });
        });

        document.querySelectorAll(".detail-btn").forEach(button => {
            button.addEventListener("click", function() {
                const eventId = this.dataset.id;
                const selectedEvent = events.find(event => event.id == eventId);
                openDescriptionPopup(selectedEvent);
            });
        });
    }

    renderEvents();
});