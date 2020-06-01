import React from 'react'
import DeletButton from "./DeletButton"

function CityInfo({val, onClick}) {
    return (
        <div className="weCard" id={val.id}>
          <DeletButton onClick={onClick}/>
          <h1>{val.city}</h1>
          <h2>{val.main}</h2>
          <h3>min temp : {val.temp_min}</h3>
          <h3>max temp : {val.temp_max}</h3>
          <h3>loction : {val.loction}</h3>         
        </div>
    )
}

export default CityInfo
