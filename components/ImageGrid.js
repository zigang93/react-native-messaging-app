import React, { Component } from 'react';
import { CameraRoll, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Permissions } from 'expo';
import PropTypes from 'prop-types';

import Grid from './Grid';
const keyExtractor = ({ uri }) => uri;

export default class ImageGrid extends Component {

  static propTypes = {
    onPressImage: PropTypes.func,
  };

  static defaultProps = { 
    onPressImage: () => {},
  };

  loading = false;
  cursor = null;

  state = {
    images: [],
  }

  componentDidMount() { 
    this.getImages();
  }

  getImages = async (after) => {
    if (this.loading) return;
    this.loading = true;
    
    const results = await CameraRoll.getPhotos({ first: 20, after, });
    const { edges, page_info: { has_next_page, end_cursor } } = results; 
    const loadedImages = edges.map(item => item.node.image);
    this.setState( {
      images: this.state.images.concat(loadedImages), 
      }, () => {
        this.loading = false;
        this.cursor = has_next_page ? end_cursor : null;
      }, 
    );
  };

  getNextImages = () => { 
    if (!this.cursor) return;
    this.getImages(this.cursor);
  };

  renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => { 
    
    const style = {
      width: size,
      height: size,
      marginLeft,
      marginTop,
    };

    return (
      <Image source={{ uri }} style={style} />
    ); 

  };

  render() {
    const { images } = this.state;

    return (
      <Grid
        data={images} 
        renderItem={this.renderItem} 
        keyExtractor={keyExtractor} 
        onEndReached={this.getNextImages}
      />
    )

  }
}

const styles = StyleSheet.create({ 
  image: {
    flex: 1, 
  },
});


