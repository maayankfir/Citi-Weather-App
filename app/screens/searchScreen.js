import React, { Component } from 'react';
import { Dimensions, TextInput, View, Text, StyleSheet, FlatList, TouchableHighlight, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    var navigation = this.props.navigation;
    this.state = {
      searchInput: '',
      searchResult: 0,
      error: '',
      item: {}
    }
  }

  searchCity = () => {
    this.fetchCityTemp(this.state.searchInput)
  }

  fetchCityTemp = (city) => {
    this.setState({
      searchResult: 0,
      error: '',
      item: {}
    })
      fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=b1194dcf0493aca39f7d01b606908a18&units=metric')
      .then((res) => res.json())
      .then((resJson) => {
        var r = resJson.main;
        var obj = resJson;
        if (resJson.cod != 200){
          this.setState({
            searchResult: 0,
            error: 'Sorry! City not found'
          })
        } else {
          var city = {
            name: obj.name,
            temp: Math.ceil(r.temp),
            type: obj.weather[0].main,
            desc: 'Humidity: '+r.humidity+'% - '+obj.weather[0].main,
          }

        this.setState({
          item: city,
            searchResult: 1
        })
}
      })
  }

  getTempRange = (temp) => {
    if(temp < 11) {
      return 1
    } else if ( 10 < temp && temp < 20  ) {
      return 2
    } else if (19 < temp && temp < 30) {
      return 3
    } else {
      return 4
    }
  }

  getEmoji = (type) => {
    if (type === 'Clouds'){
      return '☁️'
    }else if (type === 'Rain') {
      return '🌧'
    } else if (type === 'Clear') {
      return '☀️'
    } else if (type === 'Haze') {
      return '🌤'
    } else if (type === 'Thunderstorm') {
      return '⛈'
    } else if (type === 'Snow') {
      return '❄️'
    } else if (type === 'Mist') {
      return '🌫'
    }
  }

  render () {
    return (
      <View style ={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={{width: '100%', paddingTop: 40, paddingBottom: 15, backgroundColor: 'black', color:'white', textAlign:'center', fontWeight:'200', fontSize: 30}}>
        🌞 City Weather App 🌞</Text>

      <View style={{alignItems: 'center', width: '90%'}}>
        <Text style={{textAlign: 'center', lineHeight: 40, fontSize: 20, marginTop: 90}}> Search for city</Text>
        <TextInput onChangeText={(text) => this.setState({ searchInput: text })}
          value={this.state.searchInput}
          style={{width: '80%', padding: 20, margin: 5, backgroundColor: 'black', color:'white'}}
         />
         <TouchableHighlight
         style={{backgroundColor:'yellow', padding: 10, borderRadius: 6, marginTop: 30, marginBottom: 30}}
         onPress={() => this.searchCity()} >
         <Text>Search</Text>
         </TouchableHighlight>
      </View>
        {this.state.searchResult === 1 ? (

      <TouchableHighlight
        underlayColor="white"
        onPress={ () => this.setState({newAlert: 1, alertMsg: this.state.item.desc})}>
        <LinearGradient
        colors= {['rgba(0,0,0,0.05)', 'rgba(0,0,0,0)']}
        stars={[0,0.5]} >
        <View style={styles.row}>
          <Text style={[
            (this.getTempRange(this.state.item.temp) === 1) ? styles.cold : styles.temp,
            (this.getTempRange(this.state.item.temp) === 2) ? styles.medium : styles.temp,
            (this.getTempRange(this.state.item.temp) === 3) ? styles.hot : styles.temp,
            (this.getTempRange(this.state.item.temp) === 4) ? styles.veryHot : styles.temp,
            styles.temp]}>
            {this.getEmoji(this.state.item.type)}  {this.state.item.temp}°C</Text>
          <Text style={styles.cityName}>{this.state.item.name} </Text>
        </View>
        </LinearGradient>
      </TouchableHighlight>
    ) : (
      <View style= {{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontFamily: 'Didot-Bold', fontSize: 20, color: 'red',justifyContent: 'center'}}>{this.state.error} </Text>
      </View>
    )}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems:'center',
    flex: 1,
    fontFamily: 'AvenirNext-Bold'
  },
  row: {
    flex: 1,
    width: Dimensions.get('window').width,
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  cityName: {
    fontSize: 20,
    lineHeight: 40,
    fontFamily: 'Avenir'
  },
  temp: {
    fontSize: 30,
    lineHeight: 40,
    width: 130,
    marginRight: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  },
  cold: {color: 'blue'},
  medium: {color: 'green'},
  hot: {color: 'orange'},
  veryHot: {color: 'red'},
})
