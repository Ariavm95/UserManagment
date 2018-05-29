import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Easing,
  Animated, TouchableHighlight} from 'react-native';
import firebase from 'firebase';


export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = { username:'', password: '' , loading: true}
    this.login = this.login.bind(this)
    this.navi = this.navi.bind(this)
    this.animatedValue = new Animated.Value(0)
    this.animate = this.animate.bind(this)
  }

static navigationOptions = {
  header: null // !!! Hide Header
}
   componentDidMount(){
    this.animate(Easing.bounce)
     // Initialize Firebase
      var config = {
        apiKey: "AIzaSyAJ3MgLXq7r2FnLBH8MFoi3PgcWxZZn6G8",
        authDomain: "reactlogin-e3d6c.firebaseapp.com",
        databaseURL: "https://reactlogin-e3d6c.firebaseio.com",
        projectId: "reactlogin-e3d6c",
        storageBucket: "reactlogin-e3d6c.appspot.com",
        messagingSenderId: "297050507757"
      };
      firebase.initializeApp(config);
  }
  navi = (data) => {
    this.props.navigation.navigate('Profile',{data})
  }

  login =  () => {
    /* fetch('http://blabla.com', 
      {method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify(
        {username: this.state.username, password: this.state.password}
      )}).then(res => res.json()
    ) */

      // Get a reference to the database service
      var database = firebase.database();
      let email = this.state.username
      let password = this.state.password
      let nav = this.navi
      let u = this.user
      var uu = this.refs.usern
      reset = ()=>{
        this.setState({username:'', password:''})
      }
      // Sign in existing user
       firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
          var userId = firebase.auth().currentUser.uid
          var ref = database.ref('users/' + userId);
          ref.once('value').then(function(snapshot) {
            var name = snapshot.child("name").val(); 
            var address = snapshot.child("address").val(); 
            var photo = snapshot.child("photo").val();
            var age = snapshot.child("age").val();
            var blood = snapshot.child("bloodType").val();
            var phone = snapshot.child("phone").val();
            var data = {name, address, phone, photo, age, blood}
            console.log(name, address, phone, photo, blood)
            reset()
            //u.val = ''
            nav(data)
          });
        }
       )
      .catch(function(err) {
        // Handle errors
      alert("Username and password do not match!")
      });
      
  } 

  goRegister = () => {
    this.props.navigation.navigate('Register')
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

    const marginBottom = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [400, 100]
    })
    
    
    
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Animated.View style={ {marginBottom} }>
            <Text style={{fontSize: 30, color:"#ddd", fontWeight:'bold'}}>Login</Text>
        </Animated.View>
        <TextInput
            style={styles.input}
            placeholder='Username'
            value= {this.state.username}
            //secureTextEntry={this.props.secureTextEntry}
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
            ref={ref => (this.passwordInput = ref)}
            secureTextEntry={true}
            value= {this.state.password}
            onChangeText = {(password) => this.setState({password})}
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity style={styles.btn} onPress={this.login}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop:20}}   onPress={this.goRegister}>
            <Text style={styles.btnText}>Create a new account</Text>
          </TouchableOpacity>
      </KeyboardAvoidingView>
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
    justifyContent: 'center',
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
  },
  btnText: {
    color: 'white',
  },
});
