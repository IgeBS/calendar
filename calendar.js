class Calendar {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
      },
      options
    );

    this.currentDate = new Date();
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const el = this.options.container;
    el.innerHTML = `<h2 class="section__description calendar--section">CALENDAR</h2>
      <div class="section__header">Calendar</div>
      <div class="calendar">
      <div class="month">
          <span class="month__prev">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="btn-icon btn-icon--calendar"
              strokewidth="{1.5}"
              stroke="currentColor"
            >
              <path
                strokelinecap="round"
                strokelinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              ></path>
            </svg>
          </span>
          <div class="date">
            <h1>${this.months[this.currentDate.getMonth()]}</h1>
            <p>${this.currentDate.toDateString()}</p>
          </div>
          <span class="month__next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              class="btn-icon btn-icon--calendar"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </div>

        <div class="weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        <div class="days">
        ${this._getDays(this.currentDate)}
        </div>
      </div>`;

    this._event();
  }

  _getDays() {
    const lastDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );

    const firstDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );

    const prevLastDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      0
    );

    let days = Array.from({ length: firstDay.getDay() }, (_, i) =>
      new Date(firstDay).setDate(-i)
    ).reverse();

    days = days.concat(
      Array.from({ length: lastDay.getDate() }, (_, i) =>
        new Date(firstDay).setDate(i + 1)
      )
    );

    days = days.concat(
      Array.from({ length: 42 - days.length }, (_, i) =>
        new Date(lastDay).setDate(lastDay.getDate() + i + 1)
      )
    );

    const padString = (val) => {
      return val.toString().padStart(2, 0);
    };

    return days
      .map((day, dayIndex) => {
        const newDate = new Date(day);
        const newDateString = `${newDate.getFullYear()}-${padString(
          newDate.getMonth() + 1
        )}-${padString(newDate.getDate())}`;
        const today = new Date();
        const todayString = `${this.currentDate.getFullYear()}-${padString(
          this.currentDate.getMonth() + 1
        )}-${padString(this.currentDate.getDate())}`;

        const dayType =
          newDate < firstDay
            ? "day--previous"
            : newDate > lastDay
            ? "day--next"
            : "";

        const isToday = todayString === newDateString ? "today" : "";
        const isSunday = newDate.getDay() === 0 ? "weekend" : "";

        return `<div class="day ${dayType} ${isToday} ${isSunday}"   
    data-date="${day}">${newDate.getDate()}</div>`;
      })
      .join("");
  }

  _event() {
    this.options.container.addEventListener("click", (e) => {
      const el = e.target;

      if (el.closest(".month__prev")) {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this._udpate();
        return;
      }

      if (el.closest(".month__next")) {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this._udpate();
        return;
      }
    });
  }

  _udpate() {
    const [mo, dy, dys] = this.options.container.querySelectorAll(
      ".date H1, .date p, .days"
    );

    mo.textContent = this.months[this.currentDate.getMonth()];
    dy.textContent = this.currentDate.toDateString();
    dys.innerHTML = this._getDays();
  }
}

const calendar = new Calendar();
