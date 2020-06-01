import React from "react";

function Form({onSubmit, onChange, value}) {
  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <div className="search">
          <input
          value= {value}
            type="text"
            className="input"
            placeholder="please enter a city name"
            name="city"
            autoComplete="off"
            onChange={onChange}
          />
          <button className="btn">Get Weather</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
