import { View, Text } from "react-native";

const BottomSheets = () => {
    return (
        <View className="flex items-center justify-start pt-2 bg-sky-400 w-full h-12 absolute bottom-0 rounded-t-3xl" style={{ elevation: 2 }}>
            <View className="bg-white w-16 h-2 rounded-full" style={{ elevation: 2 }} />
        </View>
    );
};

export default BottomSheets;



