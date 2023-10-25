import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 20,
  },
  button: {
    marginBottom: 20,
  },
  result: {
    fontSize: 24,
  },
});

export default function App() {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  function reverseSubstring(str, start, end) {
    if (start < 0 || end >= str.length || start >= end) {
      return str;
    }
    let arr = str.split('');
    let substringArr = arr.slice(start, end + 1).reverse();
    arr.splice(start, end - start + 1, ...substringArr);
    return arr.join('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Numero de Inicio"
        keyboardType="numeric"
        onChangeText={value => setStart(parseInt(value))}
      />
      <TextInput
        style={styles.input}
        placeholder="Numero Final"
        keyboardType="numeric"
        onChangeText={value => setEnd(parseInt(value))}
      />
      <TextInput
        style={styles.input}
        placeholder="Texto"
        onChangeText={value => setText(value)}
      />
      <Button
        style={styles.button}
        title="Invertir"
        onPress={() => setResult(reverseSubstring(text, start, end))}
      />
      <Text style={styles.result}>{result}</Text>
    </View>
  );
}
