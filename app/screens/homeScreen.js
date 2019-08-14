import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    var navigation = this.props.navigation;
    this.state = {
      cities: [
          { name: "London",
            country: "UK"
          },
          { name: "Edinburgh",
            country: "UK"
          },
          { name: "New York",
            country: "US"
          },
          { name: "Texas",
            country: "US"
          },
          { name: "Washington",
            country: "US"
          },
          { name: "Paris",
            country: "France"
          },
          { name: "Doha",
            country: "Qatar"
          },
          { name: "Sydney",
            country: "Australia"
          },
          { name: "Cancun",
            country: "Mexico"
          },
          { name: "Madrid",
            country: "Spain"
          },
          { name: "Berlin",
            country: "Germany"
          },
          { name: "Brussels",
            country: "Belgium"
          },
          { name: "Copenhagen",
            country: "Denmark"
          },
          { name: "Athens",
            country: "Greece"
          },
          { name: "New Delhi",
            country: "India"
          },
          { name: "Dublin",
            country: "Ireland"
          },
          { name: "Rome",
            country: "Italy"
          },
          { name: "Tokyo",
            country: "Japan"
          },
          { name: "Wellington",
            country: "New Zealand"
          },
          { name: "Amsterdam",
            country: "Netherlands"
          },
          { name: "Oslo",
            country: "Norway"
          },
          { name: "Panama City",
            country: "Panama"
          },
          { name: "Lisbon",
            country: "Portugal"
          },
          { name: "Warsaw",
            country: "Poland"
          },
          { name: "Moscow",
            country: "Russia"
          }
        ],
        list: [],
        refresh: true,
    }
    this.fetchTemps()
  }

  fetchTemps = () => {
    var newList = []
    var list = this.getRandome(this.state.cities, 7)
    for (city in list) {
      var name = list[city].name
      var country = list[city].country
      this.fetchCityTemp(name, country, newList)
    }
  }

  getRandome = (arr, n) => {
    var result = new Array(n),
    len = arr.length
    taken = new Array(len)
    while(n--) {
      var x = Math.floor(Math.random() * len)
      result[n] = arr[ x in taken ? taken[x] : x]
      taken[x] = --len in taken ? taken[len] : len
    }
    return result
  }

  loadNewTemp = () => {
    this.setState({
      list: [],
      refresh: true
    })
    this.fetchTemps()
  }

  fetchCityTemp = (city, country, newList) => {
      fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&appid=b1194dcf0493aca39f7d01b606908a18&units=metric')
      .then((res) => res.json())
      .then((resJson) => {
        var r = resJson.main;
        var obj = resJson;
        var city = {
          name: obj.name,
          country: country,
          temp: Math.ceil(r.temp),
          type: obj.weather[0].main,
          desc: 'Humidity: '+r.humidity+'% - '+obj.weather[0].main,
        }
        newList.push(city)
        this.setState({
          list: newList,
          refresh: false
        })
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
      <Text style={{width: '100%', paddingTop: 40, paddingBottom: 15, backgroundColor: 'black', color:'white', textAlign:'center', fontWeight:'200', fontSize: 30}}>🌞 City Weather App 🌞</Text>
      <FlatList style={{width: '100%'}}
        data={this.state.list}
        refreshing={this.state.refresh}
        onRefresh={this.loadNewTemp}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={({item, index}) => (
      <TouchableHighlight
        underlayColor="white"
        onPress={ () => alert(item.desc)}
      >
        <LinearGradient
        colors= {['rgba(0,0,0,0.05)', 'rgba(0,0,0,0)']}
        stars={[0,0.5]} >
        <View style={styles.row}>
          <Text style={[
            (this.getTempRange(item.temp) === 1) ? styles.cold : styles.temp,
            (this.getTempRange(item.temp) === 2) ? styles.medium : styles.temp,
            (this.getTempRange(item.temp) === 3) ? styles.hot : styles.temp,
            (this.getTempRange(item.temp) === 4) ? styles.veryHot : styles.temp,
            styles.temp]}>
            {this.getEmoji(item.type)}  {item.temp}°C</Text>
          <Text style={styles.cityName}>{item.name} </Text>
        </View>
        </LinearGradient>
      </TouchableHighlight>
      )}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems:'center',
    flex: 1
  },
  row: {
    flex: 1,
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
  veryHot: {color: 'red'}

})
