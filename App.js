import React, { useState, useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Keyboard } from 'react-native';

// Import API de CEP
import api from './src/services/api';


export default function cep() {
  const [cep, setCep] = useState('') // Const para o botão Limpar.
  const [cepUser, setCepUser] = useState(null)
  const inputRef = useRef(null)


  async function buscar() {
    if (cep == '') {
      alert('CEP Invalido');
      setCep('')
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`)
      console.log(response.data)
      setCepUser(response.data)
      Keyboard.dismiss(); //Fechar o teclado sozinho.

    } catch (error) {
      console.log('ERROR: ' + error)
    }

  }


  function limpar() {
    setCep('')
    inputRef.current.focus();
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Text style={styles.text}> Digite o cep desejado </Text>
        <TextInput
          style={styles.input}
          placeholder='EX: 790233942'
          value={cep}
          onChangeText={(textoDigitado) => setCep(textoDigitado)}
          keyboardType='numeric'
          ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#1d45cd' }]}
          onPress={buscar}
        >
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#cd3e1d' }]}
          onPress={limpar}
        >
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>


      {cepUser &&
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  viewContainer: {
    alignItems: 'center'
  },

  text: {
    marginTop: 25,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 30,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: '90%',
    padding: 15,
    fontSize: 20
  },

  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 18,
    justifyContent: 'space-around'
  },

  btn: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 15,
  },

  btnText: {
    fontSize: 22,
    color: '#fff'
  },

  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemText: {
    fontSize: 22,
  }
})