
import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList, Modal } from 'react-native';

export default function App() {
  const [textItem, setTextItem] = useState("")
  const [list, setList] = useState([])
  const [itemSelected, setItemSelected] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  const onHandleChangeItem = text=> {
    setTextItem(text)
  }

  const addItem = () => {
    setList(prevState => [...prevState, textItem]); setTextItem("")
  }

  const handleModal = (item) => {
    setItemSelected(item)
    setModalVisible(true)
  }

  const onHandleDelete = (item) => {
    setList(prevState => prevState.filter(element => element !== item))
    setModalVisible(!modalVisible)
  }

  const renderItem = ({item}) => (
        <View style={styles.renderItemStyle}>
          <Text>{item}</Text>
          <Button title="EDIT" onPress={() => handleModal(item)}/>
        </View>
    )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LISTAS / TO DOs</Text>
      <View style={styles.inputContainer}>
        <TextInput
        placeholder="TEXTO AQUI"
        style={styles.additemInput}
        onChangeText={onHandleChangeItem}
        value={textItem}
        />
        <Button title="AGREGAR" onPress={addItem}/>
      </View>
      <View style={{ flex: 2}}>
          <FlatList
          data={list}
          keyExtractor={(item=> item.id)}
          renderItem={renderItem}
          />
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalStyle}>
            <Text>{itemSelected}</Text>
            <Button title="borrar" onPress={() => onHandleDelete(itemSelected)}
            />
            <Button title="volver" onPress={()=> setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "salmon", 
    flex: 1, padding: 50, 
    paddingTop:150,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  additemInput: {
    borderBottomColor: "black", 
    borderBottomWidth: 1,
  },
  title: {
    fontSize:30,
    marginBottom:50,
  },
  footer: {
    paddingTop:40,
  },
  renderItemStyle:{
    height: 40,
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    elevation: 3,
  },
  modalStyle: {
    borderRadius:10,
    backgroundColor: "silver",
    padding: 20,
    paddingLeft:40,
    paddingRight:40,
    marginTop:20,
    alignItems: "center",
  },
  modalContainer: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    marginTop:20,
  }
});
