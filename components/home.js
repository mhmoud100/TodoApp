import React, { useState } from 'react';
import { StyleSheet
  ,Text
  ,TouchableOpacity
  , View
  , FlatList
  , Alert
  , TouchableWithoutFeedback
  , Keyboard
  , CheckBox } from 'react-native';
import Header from './header';
import { MaterialIcons} from '@expo/vector-icons';
// import TodoItem from './todoItem';
import AddTodo from './addTodo';
//import { CheckBox } from 'react-native-elements'

export default function Home({ navigation }) {
  const [todos, setTodos] = useState([
    { text: 'buy coffe',time:'from 10 Am to 11 Am', key: '1' ,check:false},
    { text: 'create an app',time:'from 2 Pm to 4 Pm', key: '2' ,check:false},
    { text: 'play on the switch',time:'from 5 Pm to 6 Pm', key: '3',check:false }
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
  const pressHandler = (key) => {
    setTodos((prevTodos)=>{
      return prevTodos.filter(todo => {if((todo.key != key)== false){todo.check = !todo.check}return true });
    })
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
                
                  <View style={styles.item}>
                  <MaterialIcons name='delete'  size={18} color={'#333'}/>
                  <TouchableOpacity onPress={() => navigation.navigate('Details',item)}>
                  <Text style={item.check?styles.t:styles.f}>{item.text}</Text>
                  </TouchableOpacity>
                  <CheckBox style={styles.c} value= {item.check} onChange={()=>pressHandler(item.key)}/>
                  </View>
                
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
  
},t:{
  marginLeft:10,
  textDecorationLine:"line-through"
},f:{
  marginLeft:10,
  textDecorationLine:"none"
},c:{
  marginLeft:20,
}
});

