import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Input = ({ placeholder, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [focused, setFocused] = useState(false);

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const handleFocus = () => {
        setFocused(!focused);
    };

    return (
        <View className="flex flex-row justify-center items-center w-full">
            <View
                className={`flex flex-row justify-between items-center w-9/12 py-2 px-4 rounded-full ${focused
                    ? 'bg-gray-100 border-2 border-sky-500'
                    : 'bg-gray-200 border-2 border-transparent'
                    }`}
                style={{ elevation: 8 }}
            >
                <TextInput
                    className="text-md font-bold w-9/12 text-gray-700"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    onSubmitEditing={handleSearch}
                    onFocus={handleFocus}
                    onBlur={handleFocus}
                    placeholder={placeholder}
                    placeholderTextColor={'gray'}
                />
                {focused && (
                    <AntDesign name="closecircleo" size={20} color="gray" />
                )}
            </View>
        </View>
    );
};

export default Input;
