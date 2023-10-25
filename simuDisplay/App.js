import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const digits = {
  '0': [
    '# # #',
    '#     #',
    '#     #',
    '#     #',
    '# # #'
  ],
  '1': [
    ' # ',
    ' # ',
    ' # ',
    ' # ',
    ' # '
  ],
  '2': [
    '# # #',
    '         #',
    '# # #',
    '#       ',
    '# # #'
  ],
  '3': [
    '# # #',
    '        #',
    '# # #',
    '        #',
    '# # #'
  ],
  '4': [
    '#    #',
    '#    #',
    '# # #',
    '        #',
    '         #'
  ],
  '5': [
    '# # #',
    '#        ',
    '# # #',
    '        #',
    '# # #'
  ],
  '6': [
    '# # #',
    '#       ',
    '# # #',
    '#     #',
    '# # #'
  ],
  '7': [
    '# # #',
    '    # ',
    '   #  ',
    '   #   ',
    ' #    '
  ],
  '8': [
    '# # #',
    '#     #',
    '# # #',
    '#     #',
    '# # #'
  ],
  '9': [
    '# # #',
    '#     #',
    '# # #',
    '        #',
    '         #'
  ],
};

export default function NumberDrawer() {
  const [input, setInput] = useState('');

  const renderNumber = () => {
    const lines = Array(5).fill('');

    input.split('').forEach((digit) => {
      for (let i = 0; i < 5; i++) {
        if (lines[i] === '') {
          lines[i] = digits[digit][i];
        } else {
          lines[i] += ' '.repeat(5) + digits[digit][i];
        }
      }
    });

    return lines.map((line, index) => (
      <Text key={index}>{line}</Text>
    ));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        placeholder="Ingresa un número"
        onChangeText={(text) => setInput(text)}
        value={input}
      />
      
      {renderNumber()}
    </View>
  );
}

