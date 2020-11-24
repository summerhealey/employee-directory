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
    showAgeResult: [],
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

  compareEmployeeAge = (a, b) => {
    const userA = a.age.toInterger();
    const userB = b.age.toInterger();
    let compareAge = 0;

    if(userA > userB) {
      compareAge = 1;
    } else if (userA < userB) {
      compareAge = -1;
    }
    return compareAge;
  }

  // function to sort the array (which is currently this.state.showResult)
  // sortUsers will take the showResult array, and sort alphabetically
  // then set the state to be the sorted array
  sortEmployeesAge = () => {
    this.setState({showResult: this.state.showAgeResult.sort(this.compareEmployeeAge)});
    this.setState({age: true})
  }

  // ========== Functions to sort users in revese alphabetical order ==========
  compareEmployeeAgeRev = (a, b) => {
    const userA = a.age.toInterger();
    const userB = b.age.toInterger();
    let compareEmployeeAge = 0;

    if(userA > userB) {
      compareEmployeeAge = 1;
    } else if (userA < userB) {
      compareEmployeeAge = -1;
    }
    return compareEmployeeAge * -1;
  }

  sortEmployeeAgeRev = () => {
    this.setState({showResult: this.state.showLastResult.sort(this.compareEmployeeAgeRev)});
    this.setState({age: false})
  }

  // if this.state.alpha is true, run sortUsers function; else run sortUsersRev function
  sortEmployeeAge = () => {
    if(this.state.age === false) {
      this.sortEmployeeAge();
    } else {
      this.sortEmployeeAgeRev();
    }
  }

  // filter array for male employees
  filterMale = () => {
    const filterEmployees = this.state.filterResultMale;
    const filteredMale = filterEmployees.filter(employee => employee.gender === "male");
    this.setState({showResult: filteredMale});
  }

  // filter array for female employees
  filterFemale = () => {
    const filterEmployees = this.state.filterResultFemale;
    const filteredFemale = filterEmployees.filter(employee => employee.gender === "female");
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
          employees={this.state.result}
          sortEmployees={this.sortEmployeesAge}
          filterMale={this.filterMale}
          filter={this.filter}
        />
      </div> 
    );
  }
}

export default SearchResultsContainer;