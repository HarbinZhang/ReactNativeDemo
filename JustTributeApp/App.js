import React, { Component } from 'react';

import Images from './src/Images';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';


export default class App extends Component {
  
  state = {
    index: 0,
    imageWidth: null,
  }

  nextImage(event) {
    const {index, imageWidth} = this.state,
      X = event.nativeEvent.locationX,
      delta = (X < imageWidth/2) ? -1 : 1;

      let newIndex = (index + delta) % Images.length;

      if (newIndex < 0){
        newIndex = Images.length - Math.abs(newIndex);
      }

      this.setState({
        index:newIndex
      });
  }

  onImageLayout(event){
    this.setState({
      imageWidth: event.nativeEvent.layout.width
    });
  }

  render() {
    const image = Images[this.state.index];


    return (
      <View style={styles.container}>
        <View style={styles.empty}/>
          <TouchableHighlight onPress={this.nextImage.bind(this)}
              style={styles.image}>
            <Image source={{uri: image.uri}}
                style={styles.image}
                onLayout={this.onImageLayout.bind(this)}/>
          </TouchableHighlight>
          <Text style={styles.imageLabel}>{image.label}</Text>
        <View style={styles.empty}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#abcdef',
  },
  image: {
      flex: 2,
      width: 320,
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  imageLabel: {
      textAlign: 'center',
      backgroundColor: 'rgba(100, 100, 100, 0.5)',
      color: 'white',
      width: 320
  },
  empty: {
      flex: 1
  }
});


