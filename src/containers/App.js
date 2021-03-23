import React, { Component, useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  onSearchChange = (event) =>  {
    // setting the state of searchfield to the event value.
    this.setState({searchfield: event.target.value})
    
  }

  // Triggers when component mounts, so the user can be fetched from the api using promises mocked by json placeholder
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users =>  this.setState({robots: users}))
  }

  render() {
    // Destructuring to get robots and searchfield from state
    const {robots, searchfield} = this.state;
    // Filtering the robots based on the search input
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    
    // Check to see if robots have been returned from the fetch and handle it
     return !robots.length  ?
     <h1 className='tc'>Loading</h1> :
       (
        <div className='tc'>
          <h1 className='f1'>Robot Friends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundry>
               <CardList robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
  }
}

export default App;
