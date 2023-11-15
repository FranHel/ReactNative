
import { View, Text } from 'react-native';
import TopBar from '../components/TopBar';
import ContinueButton from '../components/ContinueButton';
import Prices from '../components/Prices';
import { useEffect, useState } from 'react';
import { ip } from '../functions/ip';
export default function PricesScreen({navigation, route}) {
    const id_garage = route.params.id_garage;
    const [precios, setPrecios] = useState([{}]);
    async function renderizarPrecios(){
        try{
            const response = await fetch(`http://${ip}:8080/garages/${id_garage}/precios`);
            const data = await response.json();
            console.log(data);
            return data;
        }catch(e){
            console.log("Error al renderizar los precios: "+e.message);
        }
    }
    useEffect(()=>{
        renderizarPrecios().then((data)=>{
            setPrecios(data);
        })
    },[]);
    
    return (
        <View className="h-full"> 
            <View className="h-20">
                <TopBar subtitle={'Precios en'} title={precios[0].desc_garage} />
            </View>
            <View className="mt-4">
                {precios.map((precio, index) => (
                    <View key={index}>
                        <Text className="text-gray-700 text-lg font-semibold text-center mb-2">{precio.desc_vehiculo}</Text>
                        <Prices title={'Por hora'} price={precio.hora_precio} />
                        <Prices title={'Por media hora'} price={precio.mediahora_precio} />
                        <Prices title={'Por fracciónn'} price={precio.fraccion_precio} />
                        <Prices title={'Por 12 horas'} price={precio.doce_horas_precio} />
                        <Prices title={'Por 24 horas'} price={precio.veinti_horas_precio} />
                    </View>
                ))}
            </View>
            {/*<View className="absolute bottom-0 w-full">
                <ContinueButton text={'Continuar'} enabled={true} onPress={()=>{console.log(id_garage)}}/>
                </View>*/}
        </View>
    );
}

