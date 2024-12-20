const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

const api_key = "d410f39b0197abc3d66045b6dcc9c564";
const coordinates = [];
const weathers = [];
const airs = [];

const cities = [
    "sleman",
    "terban",
    "yogyakarta",
    "dandandan"
];

const fetchCities = async () => {
    for (const city of cities) {
        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`, {
                signal: controller.signal,
            });
            const data = await response.json();
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                coordinates.push({ lat, lon, "name":city });
            }
        } catch (err) {
            console.error(err);
            coordinates.push({ "lat":false, "lon":false, "name":city });
        }
    }
};

const fetchWeathers = async () => {
    await fetchCities();
    for (const coordinate of coordinates) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinate['lat']}&lon=${coordinate['lon']}&appid=${api_key}`, {
                signal: controller.signal,
            });
            const data = await response.json();
            data.status = response.status;
            weathers.push(data);
        } catch (err) {
            console.error(err);
            weathers.push({"name":coordinate['city'], "status":500});
        }  
    }
}

const fetchAirs = async () => {
    for (const coordinate of coordinates) {
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${coordinate['lat']}&lon=${coordinate['lon']}&appid=${api_key}`, {
                signal: controller.signal,
            });
            const data = await response.json();
            data.status = response.status;
            data.name = coordinate['name'];
            airs.push(data);
        } catch (err) {
            console.error(err);
            airs.push({"name":coordinate['name'], "status":500});
        }  
    }
}

const testWeather = async () => {
    await fetchWeathers();

    console.log("test weather start");

    for (const weather of weathers) {
        console.log("running test for: "+weather['name'])

        //assert status
        console.assert(weather.status == 200, "http response is not 200");

        //assert json schema
        console.assert(weather.coord && weather.coord.lon !== undefined && weather.coord.lat !== undefined, "coord object or properties missing");
        console.assert(weather.weather && Array.isArray(weather.weather) && weather.weather.length > 0, "weather array is missing or empty");
        console.assert(weather.base !== undefined, "base property is missing");
        console.assert(weather.main && weather.main.temp !== undefined, "main object or temp property missing");
        console.assert(weather.visibility !== undefined, "visibility property is missing");
        console.assert(weather.wind && weather.wind.speed !== undefined, "wind object or speed property missing");
        console.assert(weather.clouds && weather.clouds.all !== undefined, "clouds object or all property missing");
        console.assert(weather.dt !== undefined, "dt property is missing");
        console.assert(weather.sys && weather.sys.sunrise !== undefined && weather.sys.sunset !== undefined, "sys object or sunrise/sunset properties missing");
        console.assert(weather.timezone !== undefined, "timezone property is missing");
        console.assert(weather.id !== undefined, "id property is missing");
        console.assert(weather.name !== undefined, "name property is missing");
        console.assert(weather.cod !== undefined, "cod property is missing");
    }

    console.log("test weather complete");

    clearTimeout(timeoutId);
}

const testAir = async () => {
    await fetchAirs();

    console.log("test air start");

    for (const air of airs) {
        console.log("running test for: "+air['name'])

        //assert status
        console.assert(air.status == 200, "http response is not 200");

        //assert json schema
        console.assert(air.coord && air.coord.lon !== undefined && air.coord.lat !== undefined, "coord object or lon/lat is missing");
        console.assert(Array.isArray(air.list) && air.list.length > 0, "list is missing or empty");
        console.assert(air.list[0].main && air.list[0].main.aqi !== undefined, "main or aqi is missing");
        console.assert(air.list[0].components && air.list[0].components.co !== undefined, "components or co is missing");
        console.assert(air.list[0].dt !== undefined, "dt is missing");
    }

    console.log("test air complete");

    clearTimeout(timeoutId);
}

const test = async () => {
    await testWeather();
    await testAir();
}

test();

