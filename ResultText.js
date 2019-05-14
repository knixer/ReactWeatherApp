import React from "react";

export const ResultText = (props) => {

  if(props.result == 1){
    return(
      <div>
      <p>{props.name} {props.country} , Temp: {props.temp},
       Weather: {props.main},
       Description: {props.description}
       <img src={props.imgsrc} /> </p>
       </div>
    )
  }else if(props.result == 2){
    return(
      <div>
        <ul>
          {props.data.map((weather, i) => (
            <li key={i} id={i}  onClick={props.handleClick}> {weather.name}, {weather.country} </li>

          ))}
        </ul>
      </div>
    )
  }else{
    return(
      <div>
        <p> No city found </p>
      </div>
    )
  }

};
