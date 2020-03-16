import React, { useState, useEffect } from 'react';
import {
  StyleSheet
  , Text
  , TouchableOpacity
  , View
  , FlatList
  , Alert
  , TouchableWithoutFeedback
  , Keyboard
  , CheckBox
  , AsyncStorage
  , Button
  , ActivityIndicator
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import AddTodo from './addTodo';




export default function Home({ navigation }) {

  const [get, setGet] = useState(false)
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    myAsyncEffect()
  }, []);


  useEffect(() => {
    AsyncStorage.setItem('todo', JSON.stringify(todos))
  })

  const displayData = async () => {
    const IntialTodo = await AsyncStorage.getItem('todo')
    const parsed = JSON.parse(IntialTodo)
    setTodos(parsed)
  }
  async function myAsyncEffect() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?userId=1&fbclid=IwAR2cMmTxqnOf5Nj5zEaycaN5PexzsfvBVUK5okTQUXmNJGk_osqJT8OwyQU")
    const data = await response.json();
    const item = data;
    if(data != {}){
      setGet(true)
    }else{
      setGet(false)
    }
    setTodos(item)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }
  const PressUpdateHandler = (id, title) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => { if ((todo.id != id) == false) { todo.title = title } return true });
    })
  }
  const submitHandler = (title) => {
    if (title.length > 3) {
      setTodos((prevTodos) => {
        return [
          { title: title, id: Math.random() },
          ...prevTodos
        ];
      })
    } else {
      Alert.alert('oppos', 'todo must be over 3 chars long', [
        { title: 'Understood', onPress: () => console.log('alert closed') }

      ]);
    }

  }

  const pressHandler = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => { if ((todo.id != id) == false) { todo.completed = !todo.completed } return true });
    })
  }
  const ay5ra = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.id != id);
    })
  }



  return (

    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log("Dismissed");
    }}>

      <View style={styles.container}>




        {/* <Header /> */}
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          {loading ?
            <ActivityIndicator style={styles.re} size="large" color="#0000ff" />
            :
            <View style={styles.list}>
              <FlatList
                data={todos}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <TouchableOpacity onPress={() => ay5ra(item.id)} style={{ flexDirection: 'row' }}>
                      <MaterialIcons name='delete' size={18} color={'#333'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Details', { item, PressUpdateHandler })} style={{ flexDirection: 'row', flex: 1 }} >
                      <Text style={item.completed ? styles.t : styles.f}>{item.title}</Text>
                    </TouchableOpacity>
                    <CheckBox style={styles.c} value={item.completed} onChange={() => pressHandler(item.id)} />

                  </View>
                )}
              />
              {get?
              <Button onPress={() => myAsyncEffect()} title='Click to refresh' color='coral' />
              :<Button onPress={() => displayData()} title='Click to refresh' color='black' />}
            </View>
}
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
  itemText: {
    marginLeft: 10,
  },
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    flexDirection: 'row',

  }, t: {
    marginLeft: 10,
    textDecorationLine: "line-through",
    flexShrink: 1
  }, f: {
    marginLeft: 10,
    textDecorationLine: "none",
    flexShrink: 1
  }, c: {
    marginLeft: 20,

  },
  re:{
    justifyContent: 'center',
    padding: 150
  }
});

