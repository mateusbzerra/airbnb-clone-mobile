import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from 'react-native';
import api from '../services/api';

// import { Container } from './styles';

export default function Book({ navigation }) {
  const id = navigation.getParam('id');
  const [date, setDate] = useState('');
  async function handleSubmit() {
    const userid = await AsyncStorage.getItem('user');
    await api.post(
      `/spots/${id}/bookings`,
      { date },
      {
        headers: { userid }
      }
    );

    Alert.alert('Solicitação de reserva enviada');
    navigation.navigate('List');
  }
  function handleCancel() {
    navigation.navigate('List');
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Data de interesse</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        placeholder="Qual data você quer reservar?"
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      ></TextInput>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleCancel}
        style={[styles.button, styles.cancelButton]}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginTop: 30
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#ccc'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
