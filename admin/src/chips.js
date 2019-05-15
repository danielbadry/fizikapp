import React, {Component} from 'react';
import {AutocompleteInput } from 'react-admin';
import axios from 'axios';

class Chips extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }
componentDidMount() {
  axios.get('http://localhost:1337/tags/')
  .then(result => this.setState({
    hits: result.data
  }))
  .catch(error => this.setState({
    error
  }));
}
  render() {
    return (
        <AutocompleteInput source="tags" choices={this.state.hits} optionValue="name" />
    );
  }
}
export default Chips;