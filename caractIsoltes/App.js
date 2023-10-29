import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const ContarIslotes = () => {
  const [frase, setFrase] = useState('');
  const [resultado, setResultado] = useState(0);

  const calcularIslotes = () => {
    let contador = 0;
    for (let i = 1; i < frase.length - 1; i++) {
      if (frase[i] !== frase[i - 1] && frase[i] !== frase[i + 1]) {
        contador++;
      }
    }
    setResultado(contador);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Introduce una frase"
        value={frase}
        onChangeText={setFrase}
      />
      <Button title="Calcular Islotes" onPress={calcularIslotes} />
      <Text>Resultado: {resultado}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default ContarIslotes;



