document.addEventListener("DOMContentLoaded", function() {
    const eventContainer = document.querySelector(".event-container");
    const registeredContainer = document.querySelector(".registered-container");
    const eventMoreButton = document.getElementById("event-more-button");
    const registeredMoreButton = document.getElementById("registered-more-button");
    let registeredEvents = JSON.parse(localStorage.getItem("registeredEvents")) || [];

    function renderUpcomingEvents() {
        eventContainer.innerHTML = "";
        let events = [
            { id: 1, title: "清潔河川志工日", date: "2025-04-15", location: "台北市大安溪"},
            { id: 2, title: "節水教育講座", date: "2025-05-10", location: "高雄環保教育中"},
            { id: 3, title: "水資源探訪之旅", date: "2025-06-20", location: "新竹水庫",},
            { id: 4, title: "生態濕地保育日", date: "2025-07-05", location: "宜蘭濕地",},
            { id: 5, title: "水質檢測與環境教育", date: "2025-08-12", location: "台南水質檢測中心"},
            { id: 6, title: "雨水回收DIY工作坊", date: "2025-09-18", location: "台中創客中心"}
        ];

        events.forEach((event, index) => {
            const eventCard = document.createElement("div");
            eventCard.classList.add("event-card");
            eventCard.innerHTML = `
                <h3>${event.title}</h3>
                <p><strong>日期：</strong>${event.date}</p>
                <p><strong>地點：</strong>${event.location}</p>
            `;
            if (index >= 3) {
                eventCard.style.display = "none";
                eventMoreButton.style.display = "block";
            }
            eventContainer.appendChild(eventCard);
        });

        eventMoreButton.addEventListener("click", function() {
            document.querySelectorAll(".event-container .event-card").forEach(card => {
                card.style.display = "block";
            });
            eventMoreButton.style.display = "none";
        });
    }

    function renderRegisteredEvents() {
        registeredContainer.innerHTML = "";
        if (registeredEvents.length === 0) {
            registeredContainer.innerHTML = "<p style='text-align: center; color: gray;'>您尚未報名任何活動。</p>";
            return;
        }

        registeredEvents.forEach((event, index) => {
            const eventCard = document.createElement("div");
            eventCard.classList.add("event-card");
            eventCard.innerHTML = `
                <h3>${event.title}</h3>
                <p><strong>日期：</strong>${event.date}</p>
                <p><strong>地點：</strong>${event.location}</p>
            `;
            if (index >= 3) {
                eventCard.style.display = "none";
                registeredMoreButton.style.display = "block";
            }
            registeredContainer.appendChild(eventCard);
        });

        registeredMoreButton.addEventListener("click", function() {
            document.querySelectorAll(".registered-container .event-card").forEach(card => {
                card.style.display = "block";
            });
            registeredMoreButton.style.display = "none";
        });
    }

    renderUpcomingEvents();
    renderRegisteredEvents();
});