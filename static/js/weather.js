async function catchWeather(req, res) {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Alkmaar,nl&units=metric&appid=7cb76bd2c75726e5aa77abb6c6de9b09')
        const weatherData = await response.json();
        console.log(weatherData);
        fetchApiMore(weatherData);

    } catch (err) {
        res.send('something went wrong in the gathering the data');
    }
}

catchWeather();

const fetchApiMore = weather => {
    // console.log(weather.main.temp);
    const temp = weather.main.temp;
    const data = {
        temp
    };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch("/apipage", options);
};

// fetchApiMore();