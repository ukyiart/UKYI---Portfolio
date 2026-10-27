/* UKYI — interações simples do site */

document.addEventListener("DOMContentLoaded", function () {
	let selectedDate = "";
    // Atualiza o ano automaticamente no rodapé.
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // CALENDÁRIO DE DEMONSTRAÇÃO.
    // Edite a lista abaixo para mudar os dias disponíveis.
    // Formato: "AAAA-MM-DD". Exemplo: "2026-11-05".
    // Estas datas são apenas exemplos e não confirmam reservas.
    const availableDates = [
        "2026-11-02",
        "2026-11-03",
        "2026-11-04",
        "2026-11-05",
        "2026-11-06",
        "2026-11-07",
        "2026-11-09",
        "2026-11-10",
		"2026-11-11",
        "2026-11-12",
        "2026-11-13",
        "2026-11-14",
        "2026-11-17",
        "2026-11-18",
        "2026-11-19",
        "2026-11-20",
		"2026-11-21",
		"2026-11-23",
		"2026-11-24",
		"2026-11-25",
		"2026-11-26",
		"2026-11-27",
		"2026-11-28",
		"2026-11-30",
		
		//dezembro.
		
		"2026-12-01",
		"2026-12-02",
		
    ];

    const monthLabel = document.getElementById("month-label");
    const daysContainer = document.getElementById("calendar-days");
    const selectedDateLabel = document.getElementById("selected-date");
    const previousButton = document.getElementById("prev-month");
    const nextButton = document.getElementById("next-month");

    if (monthLabel && daysContainer && selectedDateLabel) {
        const today = new Date();
        let shownYear = today.getFullYear();
        let shownMonth = today.getMonth();
		

        const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
            month: "long",
            year: "numeric"
        });

        const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        function formatDateKey(year, monthIndex, day) {
            const month = String(monthIndex + 1).padStart(2, "0");
            const date = String(day).padStart(2, "0");
            return `${year}-${month}-${date}`;
        }

        function renderCalendar() {
            const firstDay = new Date(shownYear, shownMonth, 1);
            const numberOfDays = new Date(shownYear, shownMonth + 1, 0).getDate();
            // JavaScript começa a semana no domingo; convertemos para segunda-feira.
            const startOffset = (firstDay.getDay() + 6) % 7;

            monthLabel.textContent = monthFormatter.format(firstDay);
            daysContainer.replaceChildren();

            for (let i = 0; i < startOffset; i += 1) {
                const emptyCell = document.createElement("span");
                emptyCell.className = "empty-day";
                emptyCell.setAttribute("aria-hidden", "true");
                daysContainer.appendChild(emptyCell);
            }

            for (let day = 1; day <= numberOfDays; day += 1) {
                const dateKey = formatDateKey(shownYear, shownMonth, day);
                const dayButton = document.createElement("button");
                const isAvailable = availableDates.includes(dateKey);

const calendarDate = new Date(shownYear, shownMonth, day);
calendarDate.setHours(0, 0, 0, 0);

const minimumDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7
);

const isPast = calendarDate < new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
);

const isTooSoon = calendarDate < minimumDate;

                dayButton.type = "button";
                dayButton.textContent = day;
                dayButton.setAttribute("aria-label", `${day} ${monthLabel.textContent}`);

                if (isAvailable && !isPast && !isTooSoon){
                    dayButton.classList.add("available");
                    dayButton.setAttribute("aria-label", `${day} ${monthLabel.textContent}, disponível`);
                    dayButton.addEventListener("click", function () {
                        selectedDate = dateKey;
                        renderCalendar();
                        selectedDateLabel.textContent =
                            `Você selecionou ${dateFormatter.format(new Date(shownYear, shownMonth, day))}. Esta é uma consulta; a data ainda não está reservada.`;
                    });
                } else {
                    dayButton.disabled = true;
                    dayButton.setAttribute("aria-label", `${day} ${monthLabel.textContent}, indisponível`);
                }

                if (selectedDate === dateKey) {
                    dayButton.classList.add("selected");
                }

                daysContainer.appendChild(dayButton);
            }
        }

        previousButton.addEventListener("click", function () {
            shownMonth -= 1;
            if (shownMonth < 0) {
                shownMonth = 11;
                shownYear -= 1;
            }
            renderCalendar();
        });

        nextButton.addEventListener("click", function () {
            shownMonth += 1;
            if (shownMonth > 11) {
                shownMonth = 0;
                shownYear += 1;
            }
            renderCalendar();
        });

        renderCalendar();
    }

    // PESQUISA SIMPLES: procura palavras no texto das seções desta página.
    const searchForm = document.getElementById("site-search");
    const searchInput = document.getElementById("search-query");
    const searchResult = document.getElementById("search-result");

    if (searchForm && searchInput && searchResult) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");

            if (!query) {
                searchResult.textContent = "Digite algo para pesquisar.";
                return;
            }

            const searchableSections = Array.from(
                document.querySelectorAll(".main-column section[id]")
            );

            const match = searchableSections.find(function (section) {
                return section.textContent.toLocaleLowerCase("pt-BR").includes(query);
            });

            if (match) {
                searchResult.textContent = `Encontrei uma seção relacionada: ${match.querySelector("h2")?.textContent || "Conteúdo"}.`;
                match.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                searchResult.textContent = "Não encontrei esse termo nas seções principais.";
            }
        });
    }

    // O formulário abre o programa de e-mail configurado no computador.
    // Não é um serviço de envio hospedado.
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("contact-name").value.trim();
            const email = document.getElementById("contact-email").value.trim();
            const subject = document.getElementById("contact-subject").value;
            const message = document.getElementById("contact-message").value.trim();

            const recipient = "ukyiart@gmail.com"; 
            if (!recipient) {
                alert("O formulário está montado! Para preparar o envio, abra script.js e coloque seu e-mail na variável recipient.");
                return;
            }

            const formattedDeliveryDate = selectedDate
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(selectedDate + "T12:00:00"))
    : "Nenhuma data selecionada";

const body = `Nome: ${name}
E-mail: ${email}
Data desejada para entrega: ${formattedDeliveryDate}

Mensagem:
${message}`;
            const mailto = `mailto:${recipient}?subject=${encodeURIComponent("Contato UKYI — " + subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailto;
        });
    }
});
