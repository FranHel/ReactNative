import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const App = () => {
  const [entrada, setEntrada] = useState('');
  const [resultado, setResultado] = useState('');

  const contarVocales = (entrada) => {
    const vocales = ['a', 'e', 'i', 'o', 'u'];
    let conteo = Array(5).fill(0);
    for (let i = 0; i < entrada.length; i++) {
      const indice = vocales.indexOf(entrada[i].toLowerCase());
      if (indice !== -1) {
        conteo[indice]++;
      }
    }
    return conteo.join(' ');
  };

  const handlePress = () => {
    const result = contarVocales(entrada);
    setResultado(result);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        onChangeText={setEntrada}
        value={entrada}
        placeholder="Ingresa una cadena de caracteres"
        maxLength={500}
      />
      <Button title="Contar Vocales" onPress={handlePress} />
      <Text>Resultado: {resultado}</Text>
    </View>
  );
};

export default App;
