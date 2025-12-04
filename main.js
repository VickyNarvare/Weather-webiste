document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "6ea60cf711b7495e81961239250808";
  const locationInput = document.getElementById("location-input");
  const addLocationBtn = document.getElementById("add-location-btn");
  const autoLocationBtn = document.getElementById("auto-location-btn");
  const savedLocationsSelect = document.getElementById("saved-locations");
  const celsiusBtn = document.getElementById("celsius-btn");
  const fahrenheitBtn = document.getElementById("fahrenheit-btn");
  const loadingOverlay = document.getElementById("loading-overlay");
  const themeToggle = document.getElementById("theme-toggle");
  const languageToggle = document.getElementById("language-toggle");
  const notificationsToggle = document.getElementById("notifications-toggle");
  const favoritesToggle = document.getElementById("favorites-toggle");
  const settingsToggle = document.getElementById("settings-toggle");

  // New feature elements
  const city1Select = document.getElementById("city1-select");
  const city2Select = document.getElementById("city2-select");
  const compareBtn = document.getElementById("compare-btn");
  const comparisonContainer = document.getElementById("comparison-container");
  
  const aqiValue = document.getElementById("aqi-value");
  const aqiStatus = document.getElementById("aqi-status");
  const uvValue = document.getElementById("uv-value");
  const uvStatus = document.getElementById("uv-status");
  const sunrise = document.getElementById("sunrise");
  const sunset = document.getElementById("sunset");
  
  const tempTrendBtn = document.getElementById("temp-trend-btn");
  const humidityTrendBtn = document.getElementById("humidity-trend-btn");
  const pressureTrendBtn = document.getElementById("pressure-trend-btn");
  const weatherChart = document.getElementById("weather-chart");
  
  const voiceBtn = document.getElementById("voice-btn");
  const voiceStatus = document.getElementById("voice-status");
  
  const shareTwitter = document.getElementById("share-twitter");
  const shareFacebook = document.getElementById("share-facebook");
  const copyWeather = document.getElementById("copy-weather");
  const screenshotBtn = document.getElementById("screenshot-btn");
  
  const triviaFact = document.getElementById("trivia-fact");
  const refreshTrivia = document.getElementById("refresh-trivia");

  // New advanced feature elements
  const radarBtn = document.getElementById("radar-btn");
  const satelliteBtn = document.getElementById("satellite-btn");
  const cloudsBtn = document.getElementById("clouds-btn");
  const temperatureMapBtn = document.getElementById("temperature-map-btn");
  const radarCanvas = document.getElementById("radar-canvas");
  
  const clothingRec = document.getElementById("clothing-rec");
  const travelRec = document.getElementById("travel-rec");
  const activityRec = document.getElementById("activity-rec");
  
  const weatherQuizBtn = document.getElementById("weather-quiz-btn");
  const weatherMemoryBtn = document.getElementById("weather-memory-btn");
  const weatherPredictionBtn = document.getElementById("weather-prediction-btn");
  const gameContainer = document.getElementById("game-container");
  const gameContent = document.getElementById("game-content");
  const gameScore = document.getElementById("game-score");
  
  const arCameraBtn = document.getElementById("ar-camera-btn");
  const arCompassBtn = document.getElementById("ar-compass-btn");
  const arOverlayBtn = document.getElementById("ar-overlay-btn");
  const arContainer = document.getElementById("ar-container");
  const arVideo = document.getElementById("ar-video");
  const arOverlay = document.getElementById("ar-overlay");
  
  const trendsTab = document.getElementById("trends-tab");
  const patternsTab = document.getElementById("patterns-tab");
  const insightsTab = document.getElementById("insights-tab");
  const analyticsContent = document.getElementById("analytics-content");
  
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");
  
  const prevMonth = document.getElementById("prev-month");
  const nextMonth = document.getElementById("next-month");
  const currentMonth = document.getElementById("current-month");
  const weatherCalendarGrid = document.getElementById("weather-calendar-grid");
  
  const postsTab = document.getElementById("posts-tab");
  const photosTab = document.getElementById("photos-tab");
  const reportsTab = document.getElementById("reports-tab");
  const postText = document.getElementById("post-text");
  const sharePost = document.getElementById("share-post");
  const socialFeed = document.getElementById("social-feed");
  
  const cacheCurrent = document.getElementById("cache-current");
  const cacheFavorites = document.getElementById("cache-favorites");
  const clearCache = document.getElementById("clear-cache");
  const cachedCount = document.getElementById("cached-count");
  const cacheTime = document.getElementById("cache-time");

  const currentLocationTitle = document.getElementById("current-location");
  const currentTemp = document.getElementById("current-temp");
  const currentConditions = document.getElementById("current-conditions");
  const currentIcon = document.getElementById("current-icon");
  const weatherAlerts = document.getElementById("weather-alerts");
  const feelsLike = document.getElementById("feels-like");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");

  const hourlyContainer = document.getElementById("hourly-container");
  const dailyContainer = document.getElementById("daily-container");

  const historicalDate = document.getElementById("historical-date");
  const loadHistoricalBtn = document.getElementById("load-historical");
  const historicalContainer = document.getElementById("historical-container");

  let locations = JSON.parse(localStorage.getItem("weatherLocations")) || [
    "New Delhi",
  ];
  let currentCity = locations[0];
  let tempUnit = localStorage.getItem("tempUnit") || "c";
  let currentTheme = localStorage.getItem("theme") || "light";
  let currentLanguage = localStorage.getItem("language") || "en";
  let notificationsEnabled = localStorage.getItem("notifications") === "true";
  let currentCoords = null;
  let currentWeatherData = null;
  let chartInstance = null;
  let favoriteConditions = JSON.parse(localStorage.getItem("favoriteConditions")) || [];
  let weatherHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
  let gameScoreValue = 0;
  let currentCalendarDate = new Date();
  let weatherCache = JSON.parse(localStorage.getItem("weatherCache")) || {};
  let socialPosts = JSON.parse(localStorage.getItem("socialPosts")) || [];
  let arStream = null;

  // Language translations
  const translations = {
    en: {
      title: "WEATHER APP",
      hourlyForecast: "Hourly Forecast",
      dailyForecast: "5-Day Forecast",
      historicalData: "Historical Data",
      loadData: "Load Data",
      feelsLike: "Feels like",
      humidity: "Humidity",
      wind: "Wind",
      alerts: "Weather Alerts",
      comparison: "Weather Comparison",
      airQuality: "Air Quality & UV Index",
      statistics: "Weather Statistics",
      voiceCommands: "Voice Commands",
      shareWeather: "Share Weather",
      trivia: "Weather Trivia",
      compare: "Compare",
      askWeather: "Ask Weather"
    },
    es: {
      title: "APLICACIÓN DEL TIEMPO",
      hourlyForecast: "Pronóstico por Horas",
      dailyForecast: "Pronóstico de 5 Días",
      historicalData: "Datos Históricos",
      loadData: "Cargar Datos",
      feelsLike: "Sensación térmica",
      humidity: "Humedad",
      wind: "Viento",
      alerts: "Alertas Meteorológicas",
      comparison: "Comparación del Tiempo",
      airQuality: "Calidad del Aire e Índice UV",
      statistics: "Estadísticas del Tiempo",
      voiceCommands: "Comandos de Voz",
      shareWeather: "Compartir Tiempo",
      trivia: "Curiosidades del Tiempo",
      compare: "Comparar",
      askWeather: "Preguntar Tiempo"
    },
    fr: {
      title: "APPLICATION MÉTÉO",
      hourlyForecast: "Prévisions Horaires",
      dailyForecast: "Prévisions 5 Jours",
      historicalData: "Données Historiques",
      loadData: "Charger les Données",
      feelsLike: "Ressenti",
      humidity: "Humidité",
      wind: "Vent",
      alerts: "Alertes Météo",
      comparison: "Comparaison Météo",
      airQuality: "Qualité de l'Air et Indice UV",
      statistics: "Statistiques Météo",
      voiceCommands: "Commandes Vocales",
      shareWeather: "Partager Météo",
      trivia: "Anecdotes Météo",
      compare: "Comparer",
      askWeather: "Demander Météo"
    }
  };

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
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&alerts=yes`
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

      // Additional weather info
      feelsLike.textContent = tempUnit === "c" 
        ? `${Math.round(data.current.feelslike_c)}°C`
        : `${Math.round(data.current.feelslike_f)}°F`;
      humidity.textContent = `${data.current.humidity}%`;
      wind.textContent = `${data.current.wind_kph} km/h ${data.current.wind_dir}`;

      // Weather alerts
      updateWeatherAlerts(data);

      // Store current weather data
      currentWeatherData = data;
      
      // Update air quality and UV
      updateAirQualityAndUV(data);
      
      // Update weather statistics
      updateWeatherStats(data);
      
      // Store in history
      storeWeatherHistory(data);
      
      // Update smart recommendations
      generateSmartRecommendations(data);



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
                    <p>${new Date(day.date).toLocaleDateString(currentLanguage === "en" ? "en-US" : currentLanguage === "es" ? "es-ES" : "fr-FR", {
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

  // New feature functions
  const updateWeatherAlerts = (data) => {
    if (data.alerts && data.alerts.alert && data.alerts.alert.length > 0) {
      weatherAlerts.classList.remove("hidden");
      weatherAlerts.innerHTML = `
        <h3>${translations[currentLanguage].alerts}</h3>
        ${data.alerts.alert.map(alert => `
          <div class="alert-item">
            <strong>${alert.headline}</strong>
            <p>${alert.desc}</p>
          </div>
        `).join('')}
      `;
      
      // Send notification if enabled
      if (notificationsEnabled && 'Notification' in window) {
        new Notification('Weather Alert', {
          body: data.alerts.alert[0].headline,
          icon: 'icon-192.png'
        });
      }
    } else {
      weatherAlerts.classList.add("hidden");
    }
  };



  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          currentCoords = { lat, lon };
          fetchWeatherByCoords(lat, lon);
        },
        (error) => {
          alert("Unable to get your location. Please enter a city manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    showLoading();
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=5&alerts=yes`
      );
      if (!response.ok) {
        throw new Error("Location not found");
      }
      const data = await response.json();
      currentCity = `${data.location.name}, ${data.location.country}`;
      updateUI(data);
    } catch (error) {
      alert(error.message);
    } finally {
      hideLoading();
    }
  };

  const fetchHistoricalWeather = async (city, date) => {
    showLoading();
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${date}`
      );
      if (!response.ok) {
        throw new Error("Historical data not available");
      }
      const data = await response.json();
      displayHistoricalData(data);
    } catch (error) {
      alert(error.message);
    } finally {
      hideLoading();
    }
  };

  const displayHistoricalData = (data) => {
    historicalContainer.classList.remove("hidden");
    const day = data.forecast.forecastday[0];
    historicalContainer.innerHTML = `
      <div class="historical-item">
        <h3>${data.location.name} - ${day.date}</h3>
        <div class="historical-details">
          <div class="detail">
            <span>Max Temp:</span>
            <span>${tempUnit === "c" ? Math.round(day.day.maxtemp_c) + "°C" : Math.round(day.day.maxtemp_f) + "°F"}</span>
          </div>
          <div class="detail">
            <span>Min Temp:</span>
            <span>${tempUnit === "c" ? Math.round(day.day.mintemp_c) + "°C" : Math.round(day.day.mintemp_f) + "°F"}</span>
          </div>
          <div class="detail">
            <span>Condition:</span>
            <span>${day.day.condition.text}</span>
          </div>
          <div class="detail">
            <span>Humidity:</span>
            <span>${day.day.avghumidity}%</span>
          </div>
        </div>
      </div>
    `;
  };

  const toggleTheme = () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    document.body.classList.toggle("dark-theme", currentTheme === "dark");
    localStorage.setItem("theme", currentTheme);
    themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";
  };

  const toggleLanguage = () => {
    const languages = ["en", "es", "fr"];
    const currentIndex = languages.indexOf(currentLanguage);
    currentLanguage = languages[(currentIndex + 1) % languages.length];
    localStorage.setItem("language", currentLanguage);
    updateLanguage();
  };

  const updateLanguage = () => {
    document.querySelector("h1").textContent = translations[currentLanguage].title;
    document.querySelector(".hourly-forecast h2").textContent = translations[currentLanguage].hourlyForecast;
    document.querySelector(".daily-forecast h2").textContent = translations[currentLanguage].dailyForecast;
    document.querySelector(".weather-comparison h2").textContent = translations[currentLanguage].comparison;
    document.querySelector(".air-quality h2").textContent = translations[currentLanguage].airQuality;
    document.querySelector(".weather-stats h2").textContent = translations[currentLanguage].statistics;
    document.querySelector(".voice-weather h2").textContent = translations[currentLanguage].voiceCommands;
    document.querySelector(".weather-sharing h2").textContent = translations[currentLanguage].shareWeather;
    document.querySelector(".weather-trivia h2").textContent = translations[currentLanguage].trivia;
    document.querySelector(".historical-data h2").textContent = translations[currentLanguage].historicalData;
    loadHistoricalBtn.textContent = translations[currentLanguage].loadData;
    compareBtn.textContent = translations[currentLanguage].compare;
    document.querySelector(".info-item span").textContent = translations[currentLanguage].feelsLike;
  };

  const toggleNotifications = async () => {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        notificationsEnabled = permission === 'granted';
      } else {
        notificationsEnabled = !notificationsEnabled;
      }
      localStorage.setItem("notifications", notificationsEnabled.toString());
      notificationsToggle.style.opacity = notificationsEnabled ? "1" : "0.5";
    }
  };

  // New Advanced Features
  const updateAirQualityAndUV = (data) => {
    // Air Quality Index (simulated - would need separate API)
    const aqi = Math.floor(Math.random() * 150) + 1;
    aqiValue.textContent = aqi;
    
    if (aqi <= 50) {
      aqiStatus.textContent = "Good";
      aqiStatus.style.color = "#00e400";
    } else if (aqi <= 100) {
      aqiStatus.textContent = "Moderate";
      aqiStatus.style.color = "#ffff00";
    } else {
      aqiStatus.textContent = "Unhealthy";
      aqiStatus.style.color = "#ff0000";
    }
    
    // UV Index
    const uv = data.current.uv || Math.floor(Math.random() * 11);
    uvValue.textContent = uv;
    
    if (uv <= 2) {
      uvStatus.textContent = "Low";
      uvStatus.style.color = "#00e400";
    } else if (uv <= 7) {
      uvStatus.textContent = "Moderate";
      uvStatus.style.color = "#ffff00";
    } else {
      uvStatus.textContent = "High";
      uvStatus.style.color = "#ff0000";
    }
    
    // Sun times
    if (data.forecast && data.forecast.forecastday[0].astro) {
      sunrise.textContent = data.forecast.forecastday[0].astro.sunrise;
      sunset.textContent = data.forecast.forecastday[0].astro.sunset;
    }
  };

  const updateWeatherStats = (data) => {
    if (!chartInstance && weatherChart) {
      const ctx = weatherChart.getContext('2d');
      const hours = [];
      const temps = [];
      
      data.forecast.forecastday[0].hour.slice(0, 12).forEach(hour => {
        hours.push(new Date(hour.time).getHours() + ':00');
        temps.push(tempUnit === 'c' ? hour.temp_c : hour.temp_f);
      });
      
      // Simple chart drawing
      drawSimpleChart(ctx, hours, temps);
    }
  };

  const drawSimpleChart = (ctx, labels, data) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const padding = 40;
    
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#005a9c';
    ctx.lineWidth = 2;
    
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const range = maxVal - minVal || 1;
    
    ctx.beginPath();
    data.forEach((val, i) => {
      const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
      const y = height - padding - ((val - minVal) / range) * (height - 2 * padding);
      
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = '#005a9c';
    data.forEach((val, i) => {
      const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
      const y = height - padding - ((val - minVal) / range) * (height - 2 * padding);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const storeWeatherHistory = (data) => {
    const historyEntry = {
      city: data.location.name,
      temp: tempUnit === 'c' ? data.current.temp_c : data.current.temp_f,
      condition: data.current.condition.text,
      timestamp: Date.now()
    };
    
    weatherHistory.unshift(historyEntry);
    if (weatherHistory.length > 50) weatherHistory.pop();
    localStorage.setItem("weatherHistory", JSON.stringify(weatherHistory));
  };

  const compareWeather = async () => {
    const city1 = city1Select.value;
    const city2 = city2Select.value;
    
    if (!city1 || !city2) {
      alert("Please select both cities to compare");
      return;
    }
    
    showLoading();
    try {
      const [data1, data2] = await Promise.all([
        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city1}`).then(r => r.json()),
        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city2}`).then(r => r.json())
      ]);
      
      displayComparison(data1, data2);
    } catch (error) {
      alert("Error comparing cities");
    } finally {
      hideLoading();
    }
  };

  const displayComparison = (data1, data2) => {
    comparisonContainer.classList.remove("hidden");
    comparisonContainer.innerHTML = `
      <div class="comparison-grid">
        <div class="city-comparison">
          <h3>${data1.location.name}</h3>
          <div class="comparison-temp">${tempUnit === 'c' ? Math.round(data1.current.temp_c) : Math.round(data1.current.temp_f)}°${tempUnit.toUpperCase()}</div>
          <div class="comparison-condition">${data1.current.condition.text}</div>
          <div class="comparison-details">
            <div>Humidity: ${data1.current.humidity}%</div>
            <div>Wind: ${data1.current.wind_kph} km/h</div>
          </div>
        </div>
        <div class="vs-divider">VS</div>
        <div class="city-comparison">
          <h3>${data2.location.name}</h3>
          <div class="comparison-temp">${tempUnit === 'c' ? Math.round(data2.current.temp_c) : Math.round(data2.current.temp_f)}°${tempUnit.toUpperCase()}</div>
          <div class="comparison-condition">${data2.current.condition.text}</div>
          <div class="comparison-details">
            <div>Humidity: ${data2.current.humidity}%</div>
            <div>Wind: ${data2.current.wind_kph} km/h</div>
          </div>
        </div>
      </div>
    `;
  };

  const initVoiceCommands = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLanguage === 'es' ? 'es-ES' : currentLanguage === 'fr' ? 'fr-FR' : 'en-US';
      
      voiceBtn.addEventListener('click', () => {
        voiceStatus.textContent = "Listening...";
        recognition.start();
      });
      
      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        voiceStatus.textContent = `You said: "${command}"`;
        processVoiceCommand(command);
      };
      
      recognition.onerror = () => {
        voiceStatus.textContent = "Voice recognition error. Try again.";
      };
    } else {
      voiceBtn.style.display = 'none';
      voiceStatus.textContent = "Voice commands not supported in this browser";
    }
  };

  const processVoiceCommand = (command) => {
    if (command.includes('weather') || command.includes('temperature')) {
      if (currentWeatherData) {
        const temp = tempUnit === 'c' ? currentWeatherData.current.temp_c : currentWeatherData.current.temp_f;
        const condition = currentWeatherData.current.condition.text;
        const message = `Current weather in ${currentWeatherData.location.name} is ${temp}°${tempUnit.toUpperCase()} with ${condition}`;
        
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(message);
          speechSynthesis.speak(utterance);
        }
        voiceStatus.textContent = message;
      }
    } else if (command.includes('location') || command.includes('where')) {
      getUserLocation();
    } else {
      voiceStatus.textContent = "Try saying 'What's the weather?' or 'Get my location'";
    }
  };

  const shareWeather = (platform) => {
    if (!currentWeatherData) return;
    
    const temp = tempUnit === 'c' ? currentWeatherData.current.temp_c : currentWeatherData.current.temp_f;
    const condition = currentWeatherData.current.condition.text;
    const location = currentWeatherData.location.name;
    const text = `Current weather in ${location}: ${temp}°${tempUnit.toUpperCase()} - ${condition}`;
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' #Weather')}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(text).then(() => {
          alert('Weather info copied to clipboard!');
        });
        break;
    }
  };

  const takeScreenshot = () => {
    // Simple screenshot simulation - would need html2canvas library for real implementation
    alert('Screenshot feature would capture the current weather display. Install html2canvas library for full functionality.');
  };

  const weatherTrivia = [
    "Lightning strikes the Earth about 100 times per second!",
    "The fastest recorded wind speed was 253 mph during Tropical Cyclone Olivia in 1996.",
    "Antarctica is technically a desert because it receives very little precipitation.",
    "A single cloud can weigh more than a million pounds!",
    "The temperature can vary by 100°F between day and night on Mars.",
    "Raindrops are not tear-shaped - they're actually round!",
    "The wettest place on Earth is Mount Waialeale in Hawaii.",
    "Snow can actually help you stay warm by acting as insulation.",
    "The word 'hurricane' comes from the Mayan god Hurakan.",
    "Tornadoes can reach speeds of over 300 mph!"
  ];

  const showRandomTrivia = () => {
    const randomFact = weatherTrivia[Math.floor(Math.random() * weatherTrivia.length)];
    triviaFact.textContent = randomFact;
  };

  const updateComparisonSelects = () => {
    [city1Select, city2Select].forEach(select => {
      select.innerHTML = '<option value="">Select City</option>';
      locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        select.appendChild(option);
      });
    });
  };

  // Advanced Weather Features
  const drawRadar = (type) => {
    const ctx = radarCanvas.getContext('2d');
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw radar background
    ctx.fillStyle = currentTheme === 'dark' ? '#2c3e50' : '#e0e5ec';
    ctx.fillRect(0, 0, width, height);
    
    // Draw radar circles
    ctx.strokeStyle = currentTheme === 'dark' ? '#34495e' : '#a3b1c6';
    ctx.lineWidth = 1;
    const centerX = width / 2;
    const centerY = height / 2;
    
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (i * 80), 0, 2 * Math.PI);
      ctx.stroke();
    }
    
    // Draw radar sweep
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + 100, centerY - 50);
    ctx.stroke();
    
    // Simulate weather data based on type
    ctx.fillStyle = type === 'radar' ? '#0066ff' : type === 'satellite' ? '#ff6600' : '#ffffff';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 5 + 2;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const generateSmartRecommendations = (data) => {
    if (!data) return;
    
    const temp = tempUnit === 'c' ? data.current.temp_c : data.current.temp_f;
    const condition = data.current.condition.text.toLowerCase();
    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_kph;
    
    // Clothing recommendations
    let clothingAdvice = "";
    if (temp < 0) clothingAdvice = "Heavy winter coat, gloves, and warm boots recommended";
    else if (temp < 10) clothingAdvice = "Warm jacket and layers recommended";
    else if (temp < 20) clothingAdvice = "Light jacket or sweater recommended";
    else if (temp < 30) clothingAdvice = "Comfortable clothing, light layers";
    else clothingAdvice = "Light, breathable clothing recommended";
    
    if (condition.includes('rain')) clothingAdvice += ". Don't forget an umbrella!";
    
    // Travel recommendations
    let travelAdvice = "";
    if (windSpeed > 50) travelAdvice = "High winds - avoid high-profile vehicles";
    else if (condition.includes('rain')) travelAdvice = "Wet roads - drive carefully and allow extra time";
    else if (condition.includes('snow')) travelAdvice = "Snowy conditions - use winter tires and drive slowly";
    else if (temp > 35) travelAdvice = "Very hot - ensure vehicle AC works and stay hydrated";
    else travelAdvice = "Good travel conditions - safe journey!";
    
    // Activity recommendations
    let activityAdvice = "";
    if (condition.includes('sunny') && temp > 15 && temp < 30) {
      activityAdvice = "Perfect weather for outdoor activities like hiking or cycling!";
    } else if (condition.includes('rain')) {
      activityAdvice = "Great day for indoor activities - museums, shopping, or reading";
    } else if (temp < 5) {
      activityAdvice = "Cold weather - perfect for winter sports or cozy indoor activities";
    } else {
      activityAdvice = "Moderate weather - good for both indoor and outdoor activities";
    }
    
    clothingRec.textContent = clothingAdvice;
    travelRec.textContent = travelAdvice;
    activityRec.textContent = activityAdvice;
  };

  const startWeatherQuiz = () => {
    gameContainer.classList.remove('hidden');
    gameScoreValue = 0;
    gameScore.textContent = `Score: ${gameScoreValue}`;
    
    const questions = [
      { q: "What causes thunder?", a: ["Lightning heating air", "Clouds colliding", "Wind pressure"], correct: 0 },
      { q: "What is the highest cloud type?", a: ["Cirrus", "Cumulus", "Stratus"], correct: 0 },
      { q: "What measures air pressure?", a: ["Thermometer", "Barometer", "Hygrometer"], correct: 1 },
      { q: "What causes rainbows?", a: ["Light refraction", "Cloud reflection", "Air moisture"], correct: 0 }
    ];
    
    let currentQuestion = 0;
    
    const showQuestion = () => {
      if (currentQuestion >= questions.length) {
        gameContent.innerHTML = `<h3>Quiz Complete!</h3><p>Final Score: ${gameScoreValue}/${questions.length}</p>`;
        return;
      }
      
      const q = questions[currentQuestion];
      gameContent.innerHTML = `
        <h3>Question ${currentQuestion + 1}</h3>
        <p>${q.q}</p>
        ${q.a.map((answer, i) => `<button class="quiz-answer" data-answer="${i}">${answer}</button>`).join('')}
      `;
      
      document.querySelectorAll('.quiz-answer').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const selected = parseInt(e.target.dataset.answer);
          if (selected === q.correct) {
            gameScoreValue++;
            e.target.style.backgroundColor = '#00ff00';
          } else {
            e.target.style.backgroundColor = '#ff0000';
          }
          gameScore.textContent = `Score: ${gameScoreValue}`;
          setTimeout(() => {
            currentQuestion++;
            showQuestion();
          }, 1000);
        });
      });
    };
    
    showQuestion();
  };

  const startARWeather = async () => {
    try {
      arStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      arVideo.srcObject = arStream;
      arContainer.classList.remove('hidden');
      
      // Simulate AR weather overlay
      arOverlay.innerHTML = `
        <div class="ar-weather-info">
          <div class="ar-temp">${currentWeatherData ? (tempUnit === 'c' ? Math.round(currentWeatherData.current.temp_c) : Math.round(currentWeatherData.current.temp_f)) + '°' + tempUnit.toUpperCase() : '--°'}</div>
          <div class="ar-condition">${currentWeatherData ? currentWeatherData.current.condition.text : 'Loading...'}</div>
          <div class="ar-compass">🧭 N</div>
        </div>
      `;
    } catch (error) {
      alert('Camera access denied or not available');
    }
  };

  const generateWeatherCalendar = () => {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    currentMonth.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let calendarHTML = '<div class="calendar-header">';
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
      calendarHTML += `<div class="calendar-day-header">${day}</div>`;
    });
    calendarHTML += '</div>';
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      calendarHTML += '<div class="calendar-day empty"></div>';
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const weatherIcon = ['☀️', '⛅', '🌧️', '❄️', '⛈️'][Math.floor(Math.random() * 5)];
      const temp = Math.floor(Math.random() * 30) + 5;
      calendarHTML += `
        <div class="calendar-day">
          <div class="day-number">${day}</div>
          <div class="day-weather">${weatherIcon}</div>
          <div class="day-temp">${temp}°</div>
        </div>
      `;
    }
    
    weatherCalendarGrid.innerHTML = calendarHTML;
  };

  const processChatMessage = (message) => {
    const responses = {
      'weather': `Current weather: ${currentWeatherData ? currentWeatherData.current.condition.text : 'Loading...'}`,
      'temperature': `Temperature: ${currentWeatherData ? (tempUnit === 'c' ? Math.round(currentWeatherData.current.temp_c) : Math.round(currentWeatherData.current.temp_f)) + '°' + tempUnit.toUpperCase() : 'Loading...'}`,
      'humidity': `Humidity: ${currentWeatherData ? currentWeatherData.current.humidity + '%' : 'Loading...'}`,
      'wind': `Wind: ${currentWeatherData ? currentWeatherData.current.wind_kph + ' km/h' : 'Loading...'}`,
      'forecast': 'Check the 5-day forecast section above for detailed predictions!',
      'help': 'I can help you with weather information. Try asking about temperature, humidity, wind, or forecast!'
    };
    
    const lowerMessage = message.toLowerCase();
    let response = "I'm not sure about that. Try asking about weather, temperature, humidity, wind, or forecast!";
    
    for (const [key, value] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        response = value;
        break;
      }
    }
    
    const botMessage = document.createElement('div');
    botMessage.className = 'bot-message';
    botMessage.innerHTML = `
      <span class="bot-avatar">🤖</span>
      <div class="message-content">${response}</div>
    `;
    chatMessages.appendChild(botMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const addSocialPost = (text) => {
    const post = {
      id: Date.now(),
      text: text,
      author: 'You',
      timestamp: new Date().toLocaleString(),
      weather: currentWeatherData ? {
        temp: tempUnit === 'c' ? Math.round(currentWeatherData.current.temp_c) : Math.round(currentWeatherData.current.temp_f),
        condition: currentWeatherData.current.condition.text,
        location: currentWeatherData.location.name
      } : null
    };
    
    socialPosts.unshift(post);
    localStorage.setItem('socialPosts', JSON.stringify(socialPosts));
    updateSocialFeed();
  };

  const updateSocialFeed = () => {
    socialFeed.innerHTML = socialPosts.map(post => `
      <div class="social-post">
        <div class="post-header">
          <span class="post-author">${post.author}</span>
          <span class="post-time">${post.timestamp}</span>
        </div>
        <div class="post-content">${post.text}</div>
        ${post.weather ? `
          <div class="post-weather">
            📍 ${post.weather.location} • ${post.weather.temp}°${tempUnit.toUpperCase()} • ${post.weather.condition}
          </div>
        ` : ''}
      </div>
    `).join('');
  };

  const cacheWeatherData = (type) => {
    if (!currentWeatherData) return;
    
    const cacheKey = type === 'current' ? currentCity : 'favorites';
    const dataToCache = {
      data: currentWeatherData,
      timestamp: Date.now(),
      locations: type === 'favorites' ? locations : [currentCity]
    };
    
    weatherCache[cacheKey] = dataToCache;
    localStorage.setItem('weatherCache', JSON.stringify(weatherCache));
    updateCacheStatus();
  };

  const updateCacheStatus = () => {
    const cacheKeys = Object.keys(weatherCache);
    cachedCount.textContent = cacheKeys.length;
    
    if (cacheKeys.length > 0) {
      const latestCache = Math.max(...cacheKeys.map(key => weatherCache[key].timestamp));
      cacheTime.textContent = new Date(latestCache).toLocaleString();
    } else {
      cacheTime.textContent = 'Never';
    }
  };

  // Event listeners for new features
  autoLocationBtn.addEventListener("click", getUserLocation);
  themeToggle.addEventListener("click", toggleTheme);
  languageToggle.addEventListener("click", toggleLanguage);
  notificationsToggle.addEventListener("click", toggleNotifications);
  
  compareBtn.addEventListener("click", compareWeather);
  shareTwitter.addEventListener("click", () => shareWeather('twitter'));
  shareFacebook.addEventListener("click", () => shareWeather('facebook'));
  copyWeather.addEventListener("click", () => shareWeather('copy'));
  screenshotBtn.addEventListener("click", takeScreenshot);
  refreshTrivia.addEventListener("click", showRandomTrivia);
  
  // Chart controls
  [tempTrendBtn, humidityTrendBtn, pressureTrendBtn].forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.stat-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      if (currentWeatherData) updateWeatherStats(currentWeatherData);
    });
  });

  // New Advanced Feature Event Listeners
  
  // Radar controls
  radarBtn.addEventListener('click', () => {
    document.querySelectorAll('.radar-btn').forEach(b => b.classList.remove('active'));
    radarBtn.classList.add('active');
    drawRadar('radar');
  });
  
  satelliteBtn.addEventListener('click', () => {
    document.querySelectorAll('.radar-btn').forEach(b => b.classList.remove('active'));
    satelliteBtn.classList.add('active');
    drawRadar('satellite');
  });
  
  cloudsBtn.addEventListener('click', () => {
    document.querySelectorAll('.radar-btn').forEach(b => b.classList.remove('active'));
    cloudsBtn.classList.add('active');
    drawRadar('clouds');
  });
  
  temperatureMapBtn.addEventListener('click', () => {
    document.querySelectorAll('.radar-btn').forEach(b => b.classList.remove('active'));
    temperatureMapBtn.classList.add('active');
    drawRadar('temperature');
  });

  // Gaming controls
  weatherQuizBtn.addEventListener('click', startWeatherQuiz);
  
  weatherMemoryBtn.addEventListener('click', () => {
    gameContainer.classList.remove('hidden');
    gameContent.innerHTML = '<h3>Memory Game</h3><p>Remember the weather pattern sequence!</p><div class="memory-grid"></div>';
  });
  
  weatherPredictionBtn.addEventListener('click', () => {
    gameContainer.classList.remove('hidden');
    gameContent.innerHTML = '<h3>Weather Prediction</h3><p>Predict tomorrow\'s weather based on current conditions!</p>';
  });

  // AR controls
  arCameraBtn.addEventListener('click', startARWeather);
  
  arCompassBtn.addEventListener('click', () => {
    if (arStream) {
      arOverlay.innerHTML += '<div class="ar-compass-full">🧭 Weather Compass Active</div>';
    } else {
      alert('Please start AR camera first');
    }
  });
  
  arOverlayBtn.addEventListener('click', () => {
    if (arStream) {
      arOverlay.classList.toggle('enhanced-overlay');
    } else {
      alert('Please start AR camera first');
    }
  });

  // Analytics tabs
  [trendsTab, patternsTab, insightsTab].forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.analytics-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      
      const tabType = e.target.id.replace('-tab', '');
      analyticsContent.innerHTML = `<div class="analytics-${tabType}">Loading ${tabType} data...</div>`;
    });
  });

  // Chatbot
  chatSend.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
      const userMessage = document.createElement('div');
      userMessage.className = 'user-message';
      userMessage.innerHTML = `
        <div class="message-content">${message}</div>
        <span class="user-avatar">👤</span>
      `;
      chatMessages.appendChild(userMessage);
      
      setTimeout(() => processChatMessage(message), 500);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });
  
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      chatSend.click();
    }
  });

  // Calendar controls
  prevMonth.addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    generateWeatherCalendar();
  });
  
  nextMonth.addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    generateWeatherCalendar();
  });

  // Social features
  sharePost.addEventListener('click', () => {
    const text = postText.value.trim();
    if (text) {
      addSocialPost(text);
      postText.value = '';
    }
  });
  
  [postsTab, photosTab, reportsTab].forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.social-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
    });
  });

  // Cache controls
  cacheCurrent.addEventListener('click', () => cacheWeatherData('current'));
  cacheFavorites.addEventListener('click', () => cacheWeatherData('favorites'));
  
  clearCache.addEventListener('click', () => {
    weatherCache = {};
    localStorage.removeItem('weatherCache');
    updateCacheStatus();
    alert('Weather cache cleared!');
  });

  // Favorites and Settings (implement the missing functionality)
  favoritesToggle.addEventListener('click', () => {
    if (currentWeatherData) {
      const condition = currentWeatherData.current.condition.text;
      if (favoriteConditions.includes(condition)) {
        favoriteConditions = favoriteConditions.filter(c => c !== condition);
        alert(`Removed "${condition}" from favorites`);
      } else {
        favoriteConditions.push(condition);
        alert(`Added "${condition}" to favorites`);
      }
      localStorage.setItem('favoriteConditions', JSON.stringify(favoriteConditions));
    }
  });
  
  settingsToggle.addEventListener('click', () => {
    const settings = `
      Current Settings:
      - Theme: ${currentTheme}
      - Language: ${currentLanguage}
      - Temperature Unit: ${tempUnit.toUpperCase()}
      - Notifications: ${notificationsEnabled ? 'Enabled' : 'Disabled'}
      - Cached Locations: ${Object.keys(weatherCache).length}
      - Favorite Conditions: ${favoriteConditions.length}
    `;
    alert(settings);
  });
  
  loadHistoricalBtn.addEventListener("click", () => {
    const selectedDate = historicalDate.value;
    if (selectedDate) {
      fetchHistoricalWeather(currentCity, selectedDate);
    } else {
      alert("Please select a date");
    }
  });

  // Initialize theme and language
  if (currentTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.textContent = "☀️";
  }
  updateLanguage();
  notificationsToggle.style.opacity = notificationsEnabled ? "1" : "0.5";
  
  // Initialize new features
  updateComparisonSelects();
  initVoiceCommands();
  showRandomTrivia();
  
  // Initialize advanced features
  drawRadar('radar');
  generateWeatherCalendar();
  updateSocialFeed();
  updateCacheStatus();
  
  // Generate initial recommendations if weather data exists
  if (currentWeatherData) {
    generateSmartRecommendations(currentWeatherData);
  }

  // Service Worker registration for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(registration => console.log('SW registered'))
      .catch(error => console.log('SW registration failed'));
  }

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
