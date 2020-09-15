export default class SwapiService {
  getAdress = async () => {
    const getCoords = async () => {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      return {
        long: pos.coords.longitude,
        lat: pos.coords.latitude,
      };
    };

    return await getCoords();
  };

  async getPlaceData(lat, long) {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C+${long}&key=4230e3383aa84c0b8cc241a569d77df8`
    );

    return await res.json();
  }
  async getWeatherData(lat, long) {
    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&lang=ru&APPID=94e48e917dd890c0a23a07669f460b41`
    );

    return await res.json();
  }
  async getWeatherDataHourly(lat, long) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&lang=ru&
  exclude=daily&APPID=94e48e917dd890c0a23a07669f460b41`
    );

    return await res.json();
  }
  getPlace = async (lat, long) => {
    const place = await this.getPlaceData(lat, long);
    return place;
  };

  getWeather = async (lat, long) => {
    const weather = await this.getWeatherData(lat, long);
    return weather;
  };
  getWeatherHourly = async (lat, long) => {
    const weather = await this.getWeatherDataHourly(lat, long);
    return weather;
  };
}
