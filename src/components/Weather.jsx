import React, { Component } from 'react';
import "../styles/components/weather.scss"

const location = 'Pokhara'

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      temperature: null,
      name: null,
      icon: null,
      isKelvin: true,
    };
  }

  convertTemperature(isKelvin, temp, unit) {
    if (isKelvin) {
      return (temp - 273.15);
    } else {
      return (temp + 273.15);
    }
  }

  handleClick() {
    this.setState((prevState) => ({
      isKelvin: !prevState.isKelvin,
      temperature: this.convertTemperature(this.state.isKelvin, this.state.temperature)
    }));
  }

  componentDidMount() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=9d0a9f123f5196b30a2605fd47c2801c`)
      .then(
        (response) => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code:' + response.status);
            return;
          }
          response.json().then((data) => {
            console.log(data);
            let temperature = data.main.temp;
            let weather = data.weather[0].description;
            let name = data.name;
            let icon = data.weather[0].icon;
            this.setState({ temperature: temperature, weather: weather, name: name, icon: icon });
          });
        }
      )
      .catch((err) => {
        console.log('Fetch Error', err);
      });
  }

  render() {
    const { name, temperature, weather, isKelvin, icon } = this.state;
    return (
      <div className="weather">
        <h1>Location: {name}</h1>
        <h3>Weather Description: {weather}</h3>
        <span><img src={`http://openweathermap.org/img/w/${icon}.png`} alt=""/></span>
        <p>Temperature: {temperature}  {isKelvin ? ' K' : ' C'}</p>
        <button onClick={(e) => this.handleClick(e)}>
          {isKelvin ? 'Convert To Celcius' : 'Convert To Kelvin'}
        </button>
      </div>
    );
  }
}

export default Weather;