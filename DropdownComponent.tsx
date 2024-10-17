import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import getWeatherImage from './src/helpers/getWeatherImage';
import { SelectList } from 'react-native-dropdown-select-list';


export default function DropdownComponent (props : any) {
  let [selectedValue,setSelectedValue] = useState(0);
const [location, setLocation] = useState(props.data[0]);
  let [dayImage,setDayImage] = useState('');

  useEffect(()=>{
    const fetchData = async () => {
      console.log(location);
      try {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m&hourly=temperature_2m,weather_code`);
         console.log("Data from API",response.data)
        let index = getTimeIndex(response?.data?.current?.time.split(":")[0],response?.data?.hourly?.time)
        let weatherReport = getWeatherImage(response.data.hourly.weather_code[index])
        setDayImage( weatherReport );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();   

  },[location])

  
  const getTimeIndex = (currentTime : string , hours : string[]) => {
    const isLargeNumber = (element:any) => element.includes(currentTime);

    return hours.findIndex(isLargeNumber)
        
  }

  return (
    <View style={styles.container}>
       <Text style={[styles.label  && { color: 'blue' }]}>
            Select Location 
        </Text>

       <SelectList 
          setSelected={(val:any) => { 
            setSelectedValue(val)
          }
           
          } 
          onSelect={() => {
           let data=  props.data.filter((item : any)=>{
                if(item.value === selectedValue){
                   return item;
                }
            })
            setLocation(props.data[selectedValue])
          }}
          data={props.data} 
          defaultOption={props.data[0]} 
      />
      {dayImage &&
      <>
      <Text>Day </Text>
      <Image
        style={{width : 100 , height : 100 , marginTop : 10 , alignItems : "center"}}
        source={{
          uri: dayImage
        }}
      />
      </> }
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});