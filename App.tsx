import axios from 'axios';
import { useEffect, useState } from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import DropdownComponent from './DropdownComponent';
import Select from './Select';

export default function App() {
  const [location,setLocation] = useState("Pune")
  const [data, setData] = useState([]);

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`);
        setData(response.data);
        
         let filteredData = response?.data?.results?.map((item : any,index : any)=>{
               return {key: index,value : item.name + "," + item.country,...item}
         })
        setData(filteredData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();   
  },[location])


  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <TextInput
        style={styles.input}
        onChangeText={(item)=>{
          setLocation(item)
        }}
        value={location}
        placeholder="Enter Location"
      />
     {data?.length > 0 && <DropdownComponent data={data}></DropdownComponent> }
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
