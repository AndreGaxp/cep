import { useState, useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';

// Import API de CEP
import api from './src/services';


export default function cep() {
  const [cep, setCep] = useState('') // Const para o botão Limpar.
  const inputRef = useRef(null)

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

      <View style={styles.resultado}>
        <Text style={styles.itemText}>CEP: 87897309</Text>
        <Text style={styles.itemText}>Logradouro: 87897309</Text>
        <Text style={styles.itemText}>Bairro: 87897309</Text>
        <Text style={styles.itemText}>Cidade: 87897309</Text>
        <Text style={styles.itemText}>Estado: 87897309</Text>
      </View>
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