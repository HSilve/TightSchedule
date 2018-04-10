import React, {Component} from 'react';
import {View} from 'react-native';

const CardSection = (props) => {
  return (
  <View style={[styles.containerStyle, props.style]}>
    {props.children}
  </View>);

};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    // backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    // borderColor: '#ddd',
    borderColor: '#cefaff',
    position: 'relative',
    margin: 5
  }
};

export {CardSection};
