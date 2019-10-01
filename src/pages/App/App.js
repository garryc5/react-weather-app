import React, { Component } from 'react';
import './App.css';
import Map from '../../components/Map/Map';
import { getCurrentLatLng } from '../../services/geolocation';
import {getCurrentWeather} from '../../services/weather-api'
class App extends Component {
  state = {
    lat: null,
    lng: null,
    temp: null,
    icon: ''
  };
  async componentDidMount() {
    const {lat, lng} = await getCurrentLatLng();
    const weatherData = await getCurrentWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=d3945aa316355ce92bb8cc10bf63e3da`)
    this.setState({
      lat, 
      lng,
      temp : Math.round(weatherData.main.temp),
      icon: weatherData.weather[0].icon
      });
    }

  render() {
    return (
      <div className='App'>
        <Map lat={this.state.lat} lng={this.state.lng}/>
        <header className='App-header'>
          <div>{this.state.temp}&deg;</div>
            <pre>   REACT WEATHER   </pre>
            {this.state.icon && 
              <img
              src={`https://openweathermap.org/img/w/${this.state.icon}.png`}
              alt='Current Conditions'
              />
            }
        </header>    
      </div>
    );
  }

}

export default App;
