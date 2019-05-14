import React from "react";

export const Search = ({handleClick}) => {

    return(
      <div>
      <h1>Weather Search</h1>
      <input type="search" id="inputSpace"/>
      <input type="Submit" defaultValue="Search" onClick={handleClick}/>
      </div>
    );
};
