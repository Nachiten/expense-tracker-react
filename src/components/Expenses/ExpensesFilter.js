import React from "react";

import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filtrar por Año</label>
        <select onChange={props.onYearSelected} value={props.selected}>
          <option value="All">Todos</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
