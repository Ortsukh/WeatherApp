import React, { Component } from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import "./alert.css";

import SwapiService from "../services/swapi-service";

class WeatherPage extends Component {
  state = {
    long: "",
    lat: "",
    adress: "",
    weather: "",
    temp: "",
    time: "",
    date: "",
    modal: false,
    hourlyWeather: "",
  };
  swapiService = new SwapiService();
  componentDidMount() {
    this.updateItem();
  }
  updateItem() {
    this.swapiService.getAdress().then((data) => {
      this.setState({ long: data.long, lat: data.lat });
      this.updateData();
    });
  }
  updateData() {
    const { lat, long } = this.state;
    this.swapiService
      .getPlace(lat, long)
      .then((data) => {
        this.setState({ adress: data.results[0].components.city });
      })

      .then(() => {
        this.swapiService
          .getWeather(lat, long)
          .then((data) => {
            let nowDate = new Date().toISOString().slice(0, 10);
            let nowTime = Date().slice(16, 24);
            this.setState({
              temp: data.main.temp,
              weather: data.weather[0].description,
              date: nowDate,
              time: nowTime,
            });
          })
          .then(() => {
            let dataArr = JSON.parse(localStorage.getItem("data"));
            if (!dataArr) {
              dataArr = [];
            }
            dataArr.unshift(this.state);
            localStorage.setItem("data", JSON.stringify(dataArr));
          });
      });
  }
  onClickBtn() {
    const { modal, lat, long } = this.state;

    this.swapiService.getWeatherHourly(lat, long).then((data) => {
      this.setState({ modal: true, hourlyWeather: data.hourly });
    });
  }
  convertTime(s) {
    return new Date(s * 1000).toString().slice(16, 21);
  }
  infoData() {
    const { modal, hourlyWeather, time } = this.state;

    if (!modal) {
      return null;
    } else {
      let nextTime = [];
      for (let i = 1; i < 6; i++) {
        nextTime.push(this.convertTime(hourlyWeather[i].dt));
      }

      return (
        <div className=" alertm_all">
          <div className="alertm_h1\">Погода на 5 часов</div>
          <a
            href="#"
            onClick={() => this.closeMoadal()}
            className="alertm_close"
          >
            x
          </a>
          <div className="alertm_wrapper">
            Время: {nextTime[0]}, погода:
            {hourlyWeather[1].weather[0].description}, температура:
            {hourlyWeather[1].temp}°<br />
            Время: {nextTime[1]}, погода:
            {hourlyWeather[2].weather[0].description}, температура:
            {hourlyWeather[2].temp}°<br />
            Время: {nextTime[2]}, погода:
            {hourlyWeather[3].weather[0].description}, температура:
            {hourlyWeather[3].temp}°<br />
            Время: {nextTime[3]}, погода:
            {hourlyWeather[4].weather[0].description}, температура:
            {hourlyWeather[4].temp}°<br />
            Время: {nextTime[4]}, погода:
            {hourlyWeather[5].weather[0].description}, температура:
            {hourlyWeather[5].temp}°<br />
          </div>
          <div className="alertm_but" onClick={() => this.closeMoadal()}>
            OK
          </div>
        </div>
      );
    }
  }
  closeMoadal() {
    this.setState({ modal: false });
  }
  render() {
    const { lat, long, weather, temp, adress } = this.state;
    const infoWeather = this.infoData();
    return (
      <div>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 300,
          }}
        >
          <Text>Геокоординаты:</Text>
          <Text>широта: {lat}°,</Text>
          <Text>долгота: {long}°;</Text>
          <Text>Адрес: {adress}</Text>
          <Text>Погода: {weather}</Text>
          <Text>температура: {temp}°</Text>

          <TouchableOpacity style={{ marginTop: 20 }}>
            <Button
              onPress={this.onClickBtn.bind(this)}
              title="Узнать погоду на ближайшее время"
              color="grey"
            />
          </TouchableOpacity>
        </View>
        <div style={{ position: "absolute" }}>{infoWeather}</div>
      </div>
    );
  }
}
export default WeatherPage;
