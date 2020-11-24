import React, { Component } from 'react';
import Table from '../components/Table';
import API from '../utils/API';


class SearchResultsContainer extends Component {
  // create a state that will hold the response data from axios call
  state = {
    result: [],
    filter: '',
    filterResultMale: [],
    filterResultFemale: [],
    showFirstResult: [],
    showLastResult: [],
    showAgeResult: [],
    alphaFirst: false,
    alphaLast: false,
    age: false,
  }

  // add a function to make a query to https://randomuser.me/api/
  getEmployees = () => {
    API.search()
      .then(res => {
        this.setState({result: res.data.results});
        this.setState({filterResultMale: res.data.results});
        this.setState({filterResultFemale: res.data.results});
        this.setState({showFirstResult: res.data.results});
        this.setState({showLastResult: res.data.results});
        this.setState({showAgeResult: res.data.results});
      })
      .catch(err => console.log(err));
  }

  // how to sort an array of objects: https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
  // ========== Functions to sort users alphabetically ==========
  // compare function to sort users alphabetically
  compareFirst = (a, b) => {
    const userA = a.name.first.toLowerCase();
    const userB = b.name.first.toLowerCase();
    let compareFirst = 0;

    if(userA > userB) {
      compareFirst = 1;
    } else if (userA < userB) {
      compareFirst = -1;
    }
    return compareFirst;
  }

  // function to sort the array (which is currently this.state.showResult)
  // sortUsers will take the showResult array, and sort alphabetically
  // then set the state to be the sorted array
  sortEmployeesFirst = () => {
    this.setState({showResult: this.state.showFirstResult.sort(this.compareFirst)});
    this.setState({alpha: true})
  }

  // ========== Functions to sort users in revese alphabetical order ==========
  compareFirstRev = (a, b) => {
    const userA = a.name.first.toLowerCase();
    const userB = b.name.first.toLowerCase();
    let compareFirst = 0;

    if(userA > userB) {
      compareFirst = 1;
    } else if (userA < userB) {
      compareFirst = -1;
    }
    return compareFirst * -1;
  }

  sortEmployeesFirstRev = () => {
    this.setState({showResult: this.state.showFirstResult.sort(this.compareFirstRev)});
    this.setState({alpha: false})
  }

  // if this.state.alpha is true, run sortUsers function; else run sortUsersRev function
  sortFirstAlpha = () => {
    if(this.state.alphaFirst === false) {
      this.sortEmployeesFirst();
    } else {
      this.sortEmployeesFirstRev();
    }
  }

  compareLast = (a, b) => {
    const userA = a.name.last.toLowerCase();
    const userB = b.name.last.toLowerCase();
    let compareLast = 0;

    if(userA > userB) {
      compareLast = 1;
    } else if (userA < userB) {
      compareLast = -1;
    }
    return compareLast;
  }

  // function to sort the array (which is currently this.state.showResult)
  // sortUsers will take the showResult array, and sort alphabetically
  // then set the state to be the sorted array
  sortEmployeesLast = () => {
    this.setState({showResult: this.state.showLastResult.sort(this.compareLast)});
    this.setState({alphaLast: true})
  }

  // ========== Functions to sort users in revese alphabetical order ==========
  compareLastRev = (a, b) => {
    const userA = a.name.last.toLowerCase();
    const userB = b.name.last.toLowerCase();
    let compareLast = 0;

    if(userA > userB) {
      compareLast = 1;
    } else if (userA < userB) {
      compareLast = -1;
    }
    return compareLast * -1;
  }

  sortEmployeesLastRev = () => {
    this.setState({showResult: this.state.showLastResult.sort(this.compareLastRev)});
    this.setState({alphaLast: false})
  }

  // if this.state.alpha is true, run sortUsers function; else run sortUsersRev function
  sortLastAlpha = () => {
    if(this.state.alphaLast === false) {
      this.sortEmployeesLast();
    } else {
      this.sortEmployeesLastRev();
    }
  }

    // function to sort the array (which is currently this.state.showResult)
  // sortUsers will take the showResult array, and sort alphabetically
  // then set the state to be the sorted array
  sortEmployeesAge = () => {
    this.setState({showResult: this.state.showAgeResult.sort(this.compareEmployeesAge)});
    this.setState({age: true})
  }

  // ========== Functions to sort users in revese alphabetical order ==========
  compareAgeRev = (a, b) => {
    const userA = a.age.toInterger();
    const userB = b.age.toInterger();
    let compareAge = 0;

    if(userA > userB) {
      compareAge = 1;
    } else if (userA < userB) {
      compareAge = -1;
    }
    return compareAge * -1;
  }

  sortEmployeesAgeRev = () => {
    this.setState({showResult: this.state.showAgeResult.sort(this.compareAgeRev)});
    this.setState({age: false})
  }

  // if this.state.alpha is true, run sortUsers function; else run sortUsersRev function
  sortEmployeesAge = () => {
    if(this.state.age === false) {
      this.sortEmployeesAge();
    } else {
      this.sortEmployeesAgeRev();
    }
  }

  // filter array for male employees
  filterMale = () => {
    const filterUser = this.state.filterResultMale;
    const filteredMale = filterUser.filter(user => user.gender === "male");
    this.setState({showResult: filteredMale});
  }

  // filter array for female employees
  filterFemale = () => {
    const filterUser = this.state.filterResultFemale;
    const filteredFemale = filterUser.filter(user => user.gender === "female");
    this.setState({showResult: filteredFemale});
  }

  // the filter function (will cycle through male, female, and all employees)
  
  // if the state is male, run the filterMale function
  // if the state is female, run the filterFemale function
  filter = () => {
    // create a state to track whether to show just male, female, or all employees
    const currentFilter = this.state.filter;
    
    // if the currentFilter state is empty (showing all employees), then filter employees
    // by male employees
    if(currentFilter === ''){
      // filter by male users
      this.filterMale();
      this.setState({filter: 'male'});

    // if the currentFilter state is 'male' (showing all male employees), then filter employees
    // by female employees
    } else if(currentFilter === 'male') {
      // filter by female users
      this.filterFemale();
      this.setState({filter: 'female'});

    // if the currentFilter state is 'female' (showing all female employees), then show all employees
    } else {
      this.setState({showResult: this.state.result});
      this.setState({filter: ''});
    }
  }
  

  // will show all users on the homepage
  componentDidMount() {
    this.getEmployees();
  }

  render() {
    return (
      <div className="header">
        {/* User data will go in the component as props */}
        <Table 
          employees={this.state.showResult}
          sortEmployees={this.sortFirstAlpha}
          sortEmployees={this.sortLastAlpha}
          sortEmployees={this.sortAge}
          filterMale={this.filterMale}
          filter={this.filter}
        />
      </div> 
    );
  }
}

export default SearchResultsContainer;