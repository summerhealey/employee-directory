import React from 'react';

function Table(props) {
  return (
    <div>

      {/* Table of Users */}
      <table className="table table-bordered table-sm table-fixed">
        {/* Table Headers and Buttons for sorting and filtering data */}
        <thead>
          <tr>
            <th className="col-2"> Employee </th>
            <th className="col-2"> First Name </th>
            <th className="col-2"> Last Name </th>
            <th className="col-2"><button onClick={props.sortEmployeeAge}> Age </button></th>
            <th className="col-2"><button onClick={props.filter}> Gender </button></th>
            <th className="col-2"> Email </th>
            <th className="col-2"> Cell Phone </th>
            <th className="col-2"> Address </th>
          </tr>
        </thead>

        <tbody>
          {/* For every user in the results, map through the array and get info */}
          {props.users.map(({user, name, picture, email, location, cell, age}) => {
            return(
              <tr key={user.uuid}>
                <td className="col-2"><img src={picture.medium} alt="Employee Photo" /></td>
                <td className="col-2"> {name.first} </td>
                <td className="col-2"> {name.last} </td>
                <td className="col-2"> {age}</td>
                <td className="col-2"> {gender}</td>
                <td className="col-2"> {email} </td>
                <td className="col-2"> {cell} </td>
                <td className="col-2"> {location.street.number} {location.street.name} {location.city} {location.state} {location.postcode} </td>
              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
}

export default Table;