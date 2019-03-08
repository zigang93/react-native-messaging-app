import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types';

export default class Toolbar extends Component {

  static propTypes = {
      isFocused: PropTypes.bool.isRequired,
      onChangeFocus: PropTypes.func,
      onSubmit: PropTypes.func,
      onPressCamera: PropTypes.func,
      onPressLocation: PropTypes.func,
  };

  static defaultProps = { 
    onChangeFocus: () => {}, 
    onSubmit: () => {}, 
    onPressCamera: () => {}, 
    onPressLocation: () => {},
  };

  render() {
    return (
      <View style={styles.toolbar}> 
        {/* ... */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    backgroundColor: 'white',
  },
})

