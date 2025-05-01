
document.addEventListener("DOMContentLoaded", function() {
    const eventList = document.querySelector(".event-list");
    let registeredEvents = JSON.parse(localStorage.getItem("registeredEvents")) || [];

    function renderEvents() {
        eventList.innerHTML = "";
        if (registeredEvents.length === 0) {
            eventList.innerHTML = "<p style='text-align:center; color:gray;'>您尚未報名任何活動。</p>";
            return;
        }

        registeredEvents.forEach((event, index) => {
            const eventElement = document.createElement("div");
            eventElement.classList.add("event-item");
            eventElement.style.display = "block";
            eventElement.innerHTML = `
                <h3>${event.title}</h3>
                <p><strong>日期：</strong>${event.date || "未提供"}</p>
                <p><strong>地點：</strong>${event.location || "未提供"}</p>
                <p><strong>報名者：</strong>${event.name}</p>
                <p><strong>Email：</strong>${event.email}</p>
                <button class="cancel-btn" data-index="${index}">取消報名</button>
            `;
            eventList.appendChild(eventElement);
        });

        document.querySelectorAll(".cancel-btn").forEach(button => {
            button.addEventListener("click", function() {
                const index = parseInt(this.dataset.index);
                if (!isNaN(index)) {
                    registeredEvents.splice(index, 1);
                    localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents));
                    renderEvents();
                }
            });
        });
    }

    renderEvents();
});
