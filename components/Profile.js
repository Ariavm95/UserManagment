import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Dimensions, Image, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export default class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        orientation: '1',
    };
    
    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
        this.setState({
            orientation: (this.state.orientation === '1') ? '2' : '1'
        });
    });
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Profile',
    headerTintColor: "#f9df81",
    headerStyle: {
      backgroundColor: '#4f869b'
    },
    headerTitleStyle: { color: '#f9df81' },
    headerBackTitleStyle: {fontSize: 15,},
    headerLeft: null,
    headerRight: <View><TouchableOpacity style={styles.signout} onPress={() => navigation.goBack()}><Text style={styles.signoutText}>Sign out</Text></TouchableOpacity></View>,
    //headerLeft: <View><Ionicons name="md-checkmark-circle" size={32} color="green" onPress={alert} /><Text>Hello</Text></View>,
});

   componentDidMount(){

  }



  render() {
    const data = this.props.navigation.state.params.data
    if(data){
        console.log(data)
    }
  
    const WIDTH = Dimensions.get('window').width/2;
    let height = Dimensions.get('window').height/14
    return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#437284'}}>
      <ScrollView>
          <View style={styles.container}>
                <Image
                    style={{width: 100, height: 100, borderRadius: 50, marginTop: 20, alignSelf: 'flex-start', marginLeft:20}}
                    source={{uri: data.photo}}
                    />
                    <View style={{marginTop: 35, marginBottom:10}}>
                    {Object.keys(data).map(function(key, index) {
                            return  (key !== 'photo') && <View key={key} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', height: height}}>
                            <Text style={[styles.col1, {width: WIDTH}]}>{capitalize(key)}</Text>
                            <Text style={[styles.col2, {width: WIDTH}]}>{data[key]}</Text>
                    </View>
                    })}
                </View>
                   
            </View>
      </ScrollView>
      <TouchableOpacity activeOpacity={0.5} onPress={this.SampleFunction} style={styles.TouchableOpacityStyle} >
 
        <Icon name="md-create" style={styles.actionButtonIcon} />
                    
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#437284',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  signout:{
    marginRight: 8,
  },
  signoutText:{
      color: 'rgba(255, 255, 255, 0.8)'
  },
  col1:{
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'left',
    paddingLeft: 35,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  col2:{
    //marginLeft: DEVICE_WIDTH/2,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'left',
  },

  TouchableOpacityStyle:{
 
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 50,
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowOffset: {  width: 2,  height: 2,  },
    shadowRadius: 5,
  },
 
  FloatingButtonStyle: {
 
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'rgba(255, 255, 255, 0.8)',
  }
});
