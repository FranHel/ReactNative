import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';

const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [number, setNumber] = useState('');

  const reverseText = () => {
    setOutput(input.split('').reverse().join(''));
  };

  const showVowels = () => {
    setOutput(input.replace(/[^aeiou]/gi, ''));
  };

  const showSequence = () => {
    const num = parseInt(number, 10);
    if (isNaN(num) || num < 1 || num > 100) {
      Alert.alert('Número fuera de rango');
    } else {
      setOutput(Array.from({ length: num }, (_, i) => i + 1).join(', '));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput onChangeText={setInput} placeholder="Ingresa texto aquí" style={styles.input} />
      <Button title="Invertir texto" onPress={reverseText} />
      <Button title="Mostrar vocales" onPress={showVowels} />
      <Text style={styles.output}>{output}</Text>

      <TextInput onChangeText={setNumber} placeholder="Ingresa un número entre 1 y 100" style={styles.input} />
      <Button title="Mostrar secuencia" onPress={showSequence} />
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  output: {
    marginVertical: 10,
  },
});

export default App;

