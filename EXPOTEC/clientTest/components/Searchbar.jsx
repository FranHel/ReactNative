import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <View className="bg-sky-200 p-2 flex flex-row items-center m-8 rounded-full w-8/12" style={{ elevation: 8 }}>
            <Feather name="search" size={24} color="black" />
            <TextInput
                style="ml-2 flex-grow w-full"
                value={searchTerm}
                onChangeText={setSearchTerm}
                onSubmitEditing={handleSearch}
            />
        </View>
    ); 890
};

export default SearchBar;
