function syncFn() {
  console.log("syncFn start");
  for (let i = 0; i < 10; i++) {
    console.log("for");
  }
  console.log("function end");
}

function asyncFunction() {
  console.log("syncFn start");
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      console.log("for");
    }
  }, 5000);
  console.log("function end");
}

const startTimeout = document.getElementById("start-timeout"),
  stopTimout = document.getElementById("clear-timeout"),
  startInterval = document.getElementById("start-interval"),
  stopInterval = document.getElementById("clear-interval");

let timeoutId = null,
  intervalId = null;

startTimeout.addEventListener("click", () => {
  console.log("startTimeout");
  timeoutId = setTimeout(() => {
    console.log("startTimeout");
  }, 5000);
});

stopTimout.addEventListener("click", () => {
  console.log("stopTimout");
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
});

startInterval.addEventListener("click", () => {
  console.log("startInterval");
  intervalId = setInterval(() => {
    console.log("startInterval");
  }, 5000);
});

function clearIntervalFn() {
  console.log("stopInterval");
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
stopInterval.addEventListener("click", clearIntervalFn);
//  2. - 2.1, 2.2, 2.3)

(function initSliderFn() {
  const slides = document.querySelectorAll(".slide"),
    sliderWrapper = document.querySelector(".slider-wrapper"),
    prevBtn = document.querySelector(".slider-nav .prev"),
    nextBtn = document.querySelector(".slider-nav .next");

  let activeIndex = 0,
    slideIntervalId = null;

  function renderClasses() {
    slides.forEach((slide, index) => {
      if (index === activeIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  }
  renderClasses();

  function goToNextSlide() {
    if (activeIndex === slides.length - 1) {
      activeIndex = 0;
    } else {
      activeIndex++;
    }
    renderClasses();
  }

  function goToPrevSlide() {
    if (activeIndex === 0) {
      activeIndex = slides.length - 1;
    } else {
      activeIndex--;
    }
    renderClasses();
  }

  // --- ავტომატური სლაიდის კონტროლი

  function stopAutoSlide() {
    if (slideIntervalId) {
      clearInterval(slideIntervalId);
      slideIntervalId = null;
    }
  }

  function startAutoSlide() {
    stopAutoSlide(); //
    slideIntervalId = setInterval(goToNextSlide, 5000); // 2.1: 5 წამი
  }

  function handleManualSlide() {
    // ეს უზრუნველყოფს, რომ ხელით შეცვლის შემდეგ ათვლა თავიდან დაიწყოს
    stopAutoSlide();
    startAutoSlide();
  }

  // 2.1: ავტომატური სლაიდვის დაწყება
  startAutoSlide();

  // 2.2 & 2.3: მაუსის ივენთები
  sliderWrapper.addEventListener("mouseenter", stopAutoSlide); // გაჩერება
  sliderWrapper.addEventListener("mouseleave", startAutoSlide); // გაგრძელება

  // --- ივენთ ლისენერების განახლება
  nextBtn.addEventListener("click", () => {
    goToNextSlide();
    handleManualSlide();
  });

  prevBtn.addEventListener("click", () => {
    goToPrevSlide();
    handleManualSlide();
  });

  document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowRight") {
      goToNextSlide();
      handleManualSlide();
    }

    if (e.code === "ArrowLeft") {
      goToPrevSlide();
      handleManualSlide();
    }
  });
})();

// 1) საათი

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";

  // 12-საათიანი ფორმატი
  hours = hours % 12;
  hours = hours ? hours : 12;

  const pad = (num) => String(num).padStart(2, "0");

  const formattedHours = pad(hours);
  const formattedMinutes = pad(minutes);
  const formattedSeconds = pad(seconds);

  const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

  document.getElementById("clock-display").textContent = timeString;
}

// საათის დაწყება
updateClock();
setInterval(updateClock, 1000);

// 3)

let countdownIntervalId = null;

function updateCountdown() {
  const now = new Date();

  const targetDate = new Date(now.getFullYear(), 10, 28, 20, 0, 0);

  const countdownDisplay = document.getElementById("countdown-display");

  if (now >= targetDate) {
    countdownDisplay.textContent = "ლექცია დასრულდა! (ან დაიწყო)";
    if (countdownIntervalId) {
      clearInterval(countdownIntervalId);
    }
    return;
  }

  const difference = targetDate.getTime() - now.getTime();

  const msInHour = 1000 * 60 * 60;
  const msInDay = msInHour * 24;

  const days = Math.floor(difference / msInDay);

  const hours = Math.floor((difference % msInDay) / msInHour);

  const minutes = Math.floor((difference % msInHour) / (1000 * 60)); // პირდაპირ წუთებში გადაყვანა

  const pad = (num) => String(num).padStart(2, "0");

  const countdownString = `
        ${days > 0 ? days + " დღე, " : ""}
        ${pad(hours)} საათი,
        ${pad(minutes)} წუთი
    `;

  countdownDisplay.textContent = countdownString;
}

updateCountdown();

countdownIntervalId = setInterval(updateCountdown, 1000);
