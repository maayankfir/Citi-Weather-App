import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight} from 'react-native';

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
    // this.fetchCityTemp('London', 'uk')
    var list = this.getRandome(this.state.cities, 5)
    console.log(list);
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

  fetchCityTemp = (city, country) => {
      fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&appid=b1194dcf0493aca39f7d01b606908a18&units=metric')
      .then((res) => res.json())
      .then((resJson) => {
        var r = resJson.main;
        var obj = resJson;
        var city = {
          name: obj.name,
          country: country,
          temp: Math.ceil(r.temp),
          type: obj.weather[0].main
        }
        console.log(city);
      })
  }

  render () {
    return (
      <View>
      <Text style ={{ marginTop: 50, textAlign: 'center', justifyContent: 'center',alignItems:'center', fontSize: 50}}>
      Home Screen
      </Text>
      </View>
    )
  }
}
