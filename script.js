const apiKey = "b83673b788b6227ef7af36cadf678070";

// LOGIN FUNCTION
function login() {

    const username =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    // FIXED LOGIN DATA
    const correctUsername = "sweety";
    const correctPassword = "sweety@123";

    if(username === correctUsername &&
       password === correctPassword){

        alert("Login Successful ✅");

        window.location.href =
        "preferences.html";

    }else{

        alert("Invalid Username or Password ❌");
    }
}

// GENERATE PLAN
async function generatePlan() {

    const source =
    document.getElementById("source").value;

    const destination =
    document.getElementById("destination").value;

    const startDate =
    document.getElementById("startDate").value;

    const endDate =
    document.getElementById("endDate").value;

    const budget =
    parseInt(
    document.getElementById("budget").value
    );

    const interests =
    document.getElementById("interests").value;

    localStorage.setItem("source", source);
    localStorage.setItem("destination", destination);
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
    localStorage.setItem("budget", budget);
    localStorage.setItem("interests", interests);

    // WEATHER API
    let weather = "Unavailable";

    try {

        const response =
        await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${apiKey}&units=metric`
        );

        const data =
        await response.json();

        weather =
        `${data.weather[0].main} ${data.main.temp}°C`;

    } catch(error) {

        console.log(error);
    }

    localStorage.setItem("weather", weather);

    // DATE CALCULATION
    const start =
    new Date(startDate);

    const end =
    new Date(endDate);

    const days =
    Math.ceil(
    (end-start)/(1000*60*60*24)
    ) + 1;

    const dailyBudget =
    Math.floor(budget/days);

    // TOURIST DATA
    const places = [

        {
            morning:"Serenity Beach",
            next:"Auroville",
            evening:"Rock Beach",
            restaurant:"Cafe des Arts",
            food:"French Pasta",
            hotel:"Treebo South Avenue"
        },

        {
            morning:"French Colony",
            next:"White Town",
            evening:"Promenade Beach",
            restaurant:"Surguru Restaurant",
            food:"South Indian Meals",
            hotel:"Villa Shanti"
        },

        {
            morning:"Paradise Beach",
            next:"Boat House",
            evening:"Botanical Garden",
            restaurant:"Le Club",
            food:"Seafood",
            hotel:"Le Pondy Resort"
        },

        {
            morning:"Matrimandir",
            next:"Shopping Street",
            evening:"Beach Walk",
            restaurant:"Bread & Chocolate",
            food:"Pizza",
            hotel:"Auro Green Hotel"
        },

        {
            morning:"Museum Visit",
            next:"Church Park",
            evening:"Sunset Point",
            restaurant:"Coromandel Cafe",
            food:"Continental Food",
            hotel:"Hotel Atithi"
        }
    ];

    let finalPlan = "";

    for(let i=0; i<days; i++) {

        const d =
        places[i % places.length];

        const stay =
        Math.floor(dailyBudget * 0.40);

        const food =
        Math.floor(dailyBudget * 0.20);

        const travel =
        Math.floor(dailyBudget * 0.20);

        const activities =
        Math.floor(dailyBudget * 0.20);

        const trafficOptions =
        ["Low","Moderate","High"];

        const traffic =
        trafficOptions[
        Math.floor(Math.random()*3)
        ];

        finalPlan += `

        <div style="
        background:rgba(255,255,255,0.15);
        padding:15px;
        border-radius:15px;
        margin-bottom:20px;
        ">

        <h2>📅 Day ${i+1}</h2>

        <h3>🏨 Stay Details</h3>

        <p>
        <b>Hotel:</b> ${d.hotel}<br>
        <b>Stay Budget:</b> ₹${stay}
        </p>

        <hr>

        <h3>📍 Places To Visit</h3>

        <p>
        🕘 <b>9AM - 10:30AM</b><br>
        ${d.morning}
        </p>

        <p>
        🕚 <b>11AM - 12:30PM</b><br>
        ${d.next}
        </p>

        <p>
        🌆 <b>5PM Evening</b><br>
        ${d.evening}
        </p>

        <hr>

        <h3>🍽 Food Details</h3>

        <p>
        🏪 <b>Restaurant:</b>
        ${d.restaurant}<br>

        🍴 <b>Famous Food:</b>
        ${d.food}<br>

        💰 <b>Food Budget:</b>
        ₹${food}
        </p>

        <hr>

        <h3>🚕 Travel & Traffic</h3>

        <p>
        🚦 Traffic:
        ${traffic}<br>

        🚕 Travel Budget:
        ₹${travel}
        </p>

        <hr>

        <h3>🌦 Weather</h3>

        <p>
        ${weather}
        </p>

        <hr>

        <h3>💸 Daily Budget Breakdown</h3>

        <p>
        🏨 Stay: ₹${stay}<br>
        🍴 Food: ₹${food}<br>
        🚕 Travel: ₹${travel}<br>
        🎟 Activities: ₹${activities}<br><br>

        ✅ <b>Total Daily Budget:</b>
        ₹${dailyBudget}
        </p>

        </div>
        `;
    }

    localStorage.setItem(
    "plan",
    finalPlan
    );

    window.location.href =
    "result.html";
}

// LOAD RESULT
function loadResult() {

    const destination =
    localStorage.getItem("destination");

    const source =
    localStorage.getItem("source");

    const startDate =
    localStorage.getItem("startDate");

    const endDate =
    localStorage.getItem("endDate");

    const budget =
    localStorage.getItem("budget");

    const interests =
    localStorage.getItem("interests");

    const weather =
    localStorage.getItem("weather");

    const plan =
    localStorage.getItem("plan");

    document.getElementById("result")
    .innerHTML = `

    <h1>🌍 ${destination} Trip</h1>

    <p><b>From:</b> ${source}</p>

    <p><b>Dates:</b>
    ${startDate} → ${endDate}</p>

    <p><b>Budget:</b> ₹${budget}</p>

    <p><b>Interests:</b>
    ${interests}</p>

    <p><b>Weather:</b>
    ${weather}</p>

    <h2>🗓 Daily Plan</h2>

    ${plan}

    <div class="buttons">

    <a target="_blank"
    href="https://www.google.com/maps/dir/${source}/${destination}">
    <button>🛣 Route</button>
    </a>

    <a target="_blank"
    href="https://www.google.com/maps/search/tourist+places+in+${destination}">
    <button>📍 Places</button>
    </a>

    <a target="_blank"
    href="https://www.google.com/maps/search/hotels+in+${destination}">
    <button>🏨 Stays</button>
    </a>

    <a target="_blank"
    href="https://www.google.com/maps/search/restaurants+in+${destination}">
    <button>🍴 Food</button>
    </a>

    </div>
    `;

    // MAP
    const mapFrame =
    document.getElementById("mapFrame");

    if(mapFrame){

        mapFrame.src =
        `https://www.google.com/maps?q=${destination}&output=embed`;
    }
}