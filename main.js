document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "6ea60cf711b7495e81961239250808";
  const locationInput = document.getElementById("location-input");
  const addLocationBtn = document.getElementById("add-location-btn");
  const savedLocationsSelect = document.getElementById("saved-locations");
  const celsiusBtn = document.getElementById("celsius-btn");
  const fahrenheitBtn = document.getElementById("fahrenheit-btn");
  const loadingOverlay = document.getElementById("loading-overlay");

  const currentLocationTitle = document.getElementById("current-location");
  const currentTemp = document.getElementById("current-temp");
  const currentConditions = document.getElementById("current-conditions");
  const currentIcon = document.getElementById("current-icon");

  const hourlyContainer = document.getElementById("hourly-container");
  const dailyContainer = document.getElementById("daily-container");

  let locations = JSON.parse(localStorage.getItem("weatherLocations")) || [
    "New Delhi",
  ];
  let currentCity = locations[0];
  let tempUnit = localStorage.getItem("tempUnit") || "c";

  const showLoading = () => {
    loadingOverlay.classList.remove("hidden");
  };

  const hideLoading = () => {
    loadingOverlay.classList.add("hidden");
  };

  const fetchWeather = async (city) => {
    showLoading();
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      updateUI(data);
    } catch (error) {
      alert(error.message);
    } finally {
      hideLoading();
    }
  };

  const updateUI = (data) => {
    const weatherSection = document.querySelector(".current-weather");
    const hourlySection = document.querySelector(".hourly-forecast");
    const dailySection = document.querySelector(".daily-forecast");

    // Add fade-out animation
    [weatherSection, hourlySection, dailySection].forEach((section) => {
      section.style.animation = "fadeOut 0.3s ease-in-out";
    });

    setTimeout(() => {
      // Current Weather
      currentLocationTitle.textContent = `${data.location.name}, ${data.location.country}`;
      currentTemp.textContent =
        tempUnit === "c"
          ? `${Math.round(data.current.temp_c)}°C`
          : `${Math.round(data.current.temp_f)}°F`;
      currentConditions.textContent = data.current.condition.text;
      currentIcon.src = `https:${data.current.condition.icon}`;
      currentIcon.alt = data.current.condition.text;

      // Hourly Forecast
      hourlyContainer.innerHTML = "";
      data.forecast.forecastday[0].hour.forEach((hour) => {
        if (new Date(hour.time).getHours() >= new Date().getHours()) {
          const hourDiv = document.createElement("div");
          hourDiv.classList.add("forecast-item");
          hourDiv.innerHTML = `
                        <p>${new Date(hour.time).getHours()}:00</p>
                        <img src="https:${hour.condition.icon}" alt="${
            hour.condition.text
          }">
                        <p>${
                          tempUnit === "c"
                            ? `${Math.round(hour.temp_c)}°C`
                            : `${Math.round(hour.temp_f)}°F`
                        }</p>
                    `;
          hourlyContainer.appendChild(hourDiv);
        }
      });

      // 5-Day Forecast
      dailyContainer.innerHTML = "";
      data.forecast.forecastday.forEach((day) => {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("forecast-item");
        dayDiv.innerHTML = `
                    <p>${new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}</p>
                    <img src="https:${day.day.condition.icon}" alt="${
          day.day.condition.text
        }">
                    <p>${
                      tempUnit === "c"
                        ? `${Math.round(day.day.maxtemp_c)}°C / ${Math.round(
                            day.day.mintemp_c
                          )}°C`
                        : `${Math.round(day.day.maxtemp_f)}°F / ${Math.round(
                            day.day.mintemp_f
                          )}°F`
                    }</p>
                `;
        dailyContainer.appendChild(dayDiv);
      });

      // Add fade-in animation
      [weatherSection, hourlySection, dailySection].forEach((section) => {
        section.style.animation = "fadeIn 0.5s ease-in-out";
      });
    }, 300);
  };

  const updateLocationsDropdown = () => {
    savedLocationsSelect.innerHTML = "";
    locations.forEach((location) => {
      const option = document.createElement("option");
      option.value = location;
      option.textContent = location;
      if (location === currentCity) {
        option.selected = true;
      }
      savedLocationsSelect.appendChild(option);
    });
  };

  addLocationBtn.addEventListener("click", () => {
    const newLocation = locationInput.value.trim();
    if (newLocation && !locations.includes(newLocation)) {
      locations.push(newLocation);
      localStorage.setItem("weatherLocations", JSON.stringify(locations));
      currentCity = newLocation;
      updateLocationsDropdown();
      fetchWeather(currentCity);
      locationInput.value = "";
    }
  });

  savedLocationsSelect.addEventListener("change", (e) => {
    currentCity = e.target.value;
    fetchWeather(currentCity);
  });

  celsiusBtn.addEventListener("click", () => {
    tempUnit = "c";
    localStorage.setItem("tempUnit", "c");
    celsiusBtn.classList.add("active");
    fahrenheitBtn.classList.remove("active");
    fetchWeather(currentCity);
  });

  fahrenheitBtn.addEventListener("click", () => {
    tempUnit = "f";
    localStorage.setItem("tempUnit", "f");
    fahrenheitBtn.classList.add("active");
    celsiusBtn.classList.remove("active");
    fetchWeather(currentCity);
  });

  // Initial load
  if (tempUnit === "f") {
    fahrenheitBtn.classList.add("active");
    celsiusBtn.classList.remove("active");
  } else {
    celsiusBtn.classList.add("active");
    fahrenheitBtn.classList.remove("active");
  }
  updateLocationsDropdown();
  fetchWeather(currentCity);
});
