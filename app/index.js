import React, {useState} from "react";
import { render } from "react-dom";
import {Search} from "./components/Search";
import {ResultText} from "./components/ResultText";

const json = require('./cityList.json');

const App= props => {

  const [state, setState] = useState({
    data: null,
    status: null
    });

  const isEmpty = (object) => {
    for(var i in object) {
        if(object.hasOwnProperty(i))
            return false;
    }
    return true;
  }

  const changeState = (dataValue, statusValue=null) =>{
    //Where dataValue is null or the JSON response.
    //statusValue referes to what action should be taken when re-rendered
    //StatusValue 2: give the user choices over cities with the same name
    //StatusValue 1: return the city asked for
    //statusValue -1: city not found
    if(statusValue == null){
      setState({data: dataValue});
    }else{
      setState({data: dataValue, status: statusValue});
    }

  };

  const getDataFromJSON = () => {

   let city = document.getElementById('inputSpace').value;

   let resultat = json.filter(function(item){
      return item.name == city;

    });

  if( resultat.length > 1){

      changeState(resultat, 2);

    }else if(isEmpty(resultat)){

      changeState(null, -1);

      }else{

        fetchData();
        }
  }

  const fetchData = (event) => {

      let cityAndCountry;
      if(event != null){

        cityAndCountry = document.getElementById(event.target.id.toString()).innerHTML;

      }else{

        cityAndCountry = document.getElementById('inputSpace').value;
      }

      let key = 'd69126fe61bb324101eda7efad8c461d';

      fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityAndCountry + '&appid=' + key +'&units=metric')
      .then(response => response.json())
      .then(jsonResponse => {

        changeState(jsonResponse, 1);


      }).catch(function(error){

        console.log('Fetch Error :' + error);
      });

      console.log(state.data); //null pga promise från fetch körs sist
    }


    if(state.status != null){
      if(state.status > 1){

        return(
            <div>
              <Search handleClick={getDataFromJSON} />
              <ResultText data={state.data} result={2} handleClick={(event) => fetchData(event)}/>
            </div>
          );
        }else if(state.status == -1){

          return (
            <div>
                <Search handleClick={getDataFromJSON} />
                <ResultText result={-1}/>
              </div>
            );
          }else{

            return (
              <div>
                  <Search handleClick={getDataFromJSON} />
                  <ResultText result={1} name={state.data.name} country={state.data.sys.country} temp={state.data.main.temp}
                    weather={state.data.weather[0].main}
                    descripton={state.data.weather[0].description}
                    imgsrc = {"http://openweathermap.org/img/w/" + state.data.weather[0].icon +".png"} />
                </div>
            );
          }
    }else{

      return (
          <div>
            <Search handleClick={getDataFromJSON} />
          </div>
      );
    }

}

render(<App/>, window.document.getElementById("app"));
