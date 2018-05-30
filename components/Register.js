import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Easing,
  Animated, TouchableHighlight} from 'react-native';
import firebase from 'firebase';


export default class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = { username:'', password: '' , phone: '', age: '', blood: '', address: '', loading: true}
    this.register = this.register.bind(this)
    this.navi = this.navi.bind(this)
    this.animatedValue = new Animated.Value(0)
    this.animate = this.animate.bind(this)
  }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Register',
        headerTintColor: "#f9df81",
        headerStyle: {
          backgroundColor: '#4f869b'
        },
        headerTitleStyle: { color: '#f9df81' },
        headerBackTitleStyle: {fontSize: 15,},
    }
  );

  componentDidMount(){
    this.animate(Easing.in)
     // Initialize Firebase
      var config = {
        apiKey: "AIzaSyAJ3MgLXq7r2FnLBH8MFoi3PgcWxZZn6G8",
        authDomain: "reactlogin-e3d6c.firebaseapp.com",
        databaseURL: "https://reactlogin-e3d6c.firebaseio.com",
        projectId: "reactlogin-e3d6c",
        storageBucket: "reactlogin-e3d6c.appspot.com",
        messagingSenderId: "297050507757"
      };
      //firebase.initializeApp(config);
  }
  navi = (data) => {
    this.props.navigation.navigate('Profile',{data})
  }

  register =  () => {

      // Get a reference to the database service
      var database = firebase.database();
      let email = this.state.username
      let password = this.state.password
      let nav = this.navi
      let u = this.user
      var uu = this.refs.usern
      reset = ()=>{
        this.setState({username:'', password:'', phone: '', address: '', age: '', blood: ''})
      }

  }

  animate (easing) {
    this.animatedValue.setValue(0)
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 1000,
          easing
        }
    ).start()
  }

  render() {
    const paddingBottom = this.animatedValue.interpolate({
      inputRange: [0, 0.5],
      outputRange: [180, 18]
    })

    return (
        <View style={styles.container}>
        <Animated.View style={ {paddingBottom} }>
            <Text style={{fontSize: 20, color:"#ddd", fontWeight:'bold'}}></Text>
        </Animated.View>
        <KeyboardAvoidingView enabled={true} behavior='padding' contentContainerStyle={{flex:1, alignItems: 'center',}}>
        <TextInput
            style={styles.input}
            placeholder='Username'
            value= {this.state.username}
            onChangeText = {(username) => this.setState({username})}
            keyboardType = 'email-address'
            autoCorrect={false}
            returnKeyType= 'next'
            autoCapitalize="none"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onSubmitEditing={() => this.passwordInput.focus()}
            ref={ref => (this.usern = ref)}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            //ref={ref => (this.passwordInput = ref)}
            secureTextEntry={true}
            value= {this.state.password}
            onChangeText = {(password) => this.setState({password})}
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.input}
            placeholder='Age'
            value= {this.state.age}
            onChangeText = {(age) => this.setState({age})}
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.input}
            placeholder='Blood'
            value= {this.state.blood}
            onChangeText = {(blood) => this.setState({blood})}
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.input}
            placeholder='Adress'
            //ref={ref => (this.passwordInput = ref)}
            value= {this.state.address}
            onChangeText = {(address) => this.setState({address})}
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.input}
            placeholder='Phone number'
            //ref={ref => (this.passwordInput = ref)}
            value= {this.state.phone}
            onChangeText = {(phone) => this.setState({phone})}
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity style={styles.btn} onPress={this.register}>
            <Text style={styles.btnText}>Sign up</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const Button = ({onPress, easing}) => (
	<TouchableHighlight  onPress={onPress}>
    <Text>{easing}</Text>
  </TouchableHighlight>
)
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4f869b',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    backgroundColor: 'rgb(135, 166, 178)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    marginBottom: 20,
    color: '#fff',
  },
  btn: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    alignSelf: 'center',
  },
  btnText: {
    color: 'white',
  },
});
