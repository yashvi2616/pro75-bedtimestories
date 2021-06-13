import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor(){
    super()
    this.state={
      email : "",
      password : ""
    }
  }

  showAlert(errorCode){
    switch(errorCode){
      case 'auth/user-not-found':
        alert('To many requests.Try again later')
        this.setState({
          email:"",
          password : ""
        })
        break
      case 'auth/invalid-email':
        alert('Please enter the correct email and password')
        this.setState({
          password : ""
        })
        break
      default:
        this.setState({
          email:"",
          password : ""
        })
        alert('Invalid email and password')
    }
  }

  render(){
    return(
      <View style={styles.container}>

        <View style={styles.container1}>
          <Text style={styles.title}>Bedtime Stories</Text>
         <Image
         style={styles.image}
         source = {{uri: 'https://image.winudf.com/v2/image1/Y29tLnZpZGVvZ3lhbi5raWRzX3N0b3JpZXNfaWNvbl8xNTY4MDI0OTg1XzA1Nw/icon.png?w=&fakeurl=1',}}/>
          <TextInput
              placeholder="Enter the e-mail"
              placeholderTextColor = "red"
              onChangeText= {(emailText)=>{
                  this.setState({
                      email: emailText
                  })
              }}
              value={this.state.email}
              style={styles.textInput}
              />
          <TextInput
              placeholder="Enter the password"
              placeholderTextColor = "red"
              onChangeText= {(passwordText)=>{
                  this.setState({
                      password: passwordText
                  })
              }}
              value={this.state.password}
              style={styles.textInput}
              secureTextEntry = {true}
              />
        </View>
        <View style={styles.container2}>
          <TouchableOpacity
            style={styles.button}
            onPress = {async()=>{
              var email  = await this.state.email;
              var password = await this.state.password
              firebase.auth().signInWithEmailAndPassword(email, password)
              .then(()=>{
                this.props.navigation.navigate('WriteStory')
              })
              .catch((error)=> {
                var errorCode = error.code;
                var errorMessage = error.message;
                return this.showAlert(errorCode)
              })
            }}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F7EBD2'
  },
  title:{
    fontWeight:"bold",
    fontSize:30,
    color:'blue',
    fontFamily: 'arial black',
    marginTop: -5
  },
  image:{
    width:200,
    height:200,
    margin:20,
    borderWidth:5,
    borderColor:'red',
    borderRadius:20
  },
  container1:{
    justifyContent:'center',
    alignItems:'center',
    margin: 20,
    marginBottom: -10
  },
  container2:{
    alignItems:'center',
    margin: 10 
  },
  textInput : {
    width:200,
    height: 50,
    borderWidth:2,
    borderColor:'black',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom:10,
    borderRadius:10,
    margin: 0,
    backgroundColor: 'white',
    fontWeight: 'bold'
  },
  button:{
    width:90,
    height:90,
    backgroundColor: 'red',
    justifyContent:'center',
    alignItems:'center',
    borderWidth: 3,
    borderColor:'black',
    borderRadius: 100,
    marginTop: 1 
  },
  buttonText:{
    color:'white',
    fontSize:25,
    fontWeight: 'bold'
  }
})