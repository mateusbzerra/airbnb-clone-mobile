import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Image,
  AsyncStorage,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import socketio from 'socket.io-client';

import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List() {
  const [techs, setTechs] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('user').then(userid => {
      const socket = socketio('http://localhost:3333', {
        query: { userid }
      });
      socket.on('booking_response', booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} foi ${
            booking.approved ? 'Aprovada' : 'Recusada'
          }`
        );
      });
    });
  }, []);
  useEffect(() => {
    //AsyncStorage.clear();
    AsyncStorage.getItem('techs').then(storageTechs => {
      const techsArray = storageTechs.split(',').map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo}></Image>
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech}></SpotList>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10
  }
});
