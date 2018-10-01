import React from 'react';
import { Platform, StatusBar, Button, StyleSheet, View, Text, TextInput } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import MapView from 'react-native-maps';

export default class App extends React.Component {
  state = {
    text: '',
    region: {
      latitude: 53.4808,
      longitude: -2.2426,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: 'center', marginTop: 40, fontSize: 20,
            color: '#eeeeee',
            fontWeight: 'bold',
          }}
        >Block DJ</Text>
        <TextInput
          style={{ margin: 10, marginTop: 50, height: 40, borderColor: 'gray', color: '#eeeeee', borderWidth: 1, padding: 10 }}
          onChangeText={(text) => this.setState({ text })}
          placeholder="Find DJs in..."
          value={this.state.text}
        />
        <View>
          <Button style={{ backgroundColor: 'gray', zIndex: 2 }} title="locate me" onPress={() => {
            this.getLocationHandler();
          }}>Locate Me</Button>
        </View>
        <MapView
          style={{ width: 500, height: 500 }}
          region={this.state.region}
        />
      </View>
    );
  }

  getLocation = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej)
    })
  }

  async  getLocationHandler() {
    const res = await this.getLocation();  // wait for getPosition to complete
    if (res) {
      const lat = res.coords.latitude;
      const long = res.coords.longitude;
      const coords = { ...this.state.region, latitude: lat, longitude: long }
      this.setState({
        region: coords
      })
    }
    console.log(this.state.region);
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#37474f',
  }
});
