import React, { useState } from 'react';
import { StyleSheet, Text,TouchableOpacity, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './header';
import { MaterialIcons} from '@expo/vector-icons';
// import TodoItem from './todoItem';
import AddTodo from './addTodo';
export default function Home({ navigation }) {
  const [todos, setTodos] = useState([
    { text: 'buy coffe',time:'from 10 Am to 11 Am', key: '1' },
    { text: 'create an app',time:'from 2 Pm to 4 Pm', key: '2' },
    { text: 'play on the switch',time:'from 5 Pm to 6 Pm', key: '3' }
  ]);
  
  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [
          { text: text, key: Math.random().toString() },
          ...prevTodos
        ];
      })
    } else {
      Alert.alert('oppos', 'todo must be over 3 chars long', [
        { text: 'Understood', onPress: () => console.log('alert closed') }

      ]);
    }

  }
  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log("Dismissed");
    }}>
      <View style={styles.container}>
        <Header />
        <View style = {styles.content}>
          <AddTodo submitHandler={submitHandler}
          />
          <View style ={styles.list}>
            <FlatList 
              data={todos}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('Details',item)}>
                  <View style={styles.item}>
                  <MaterialIcons name='delete'  size={18} color={'#333'}/>
                  <Text styles={styles.itemText}>{item.text}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf0e6',
  },
  content: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  list: {
    flex: 1,
    marginTop: 10,

  },
  itemText:{
    marginLeft:10,
},
item: {
  padding: 16,
  marginTop: 16,
  borderColor: '#bbb',
  borderWidth: 1,
  borderStyle: 'dashed',
  borderRadius: 10,
  flexDirection:'row',
  
}
});

