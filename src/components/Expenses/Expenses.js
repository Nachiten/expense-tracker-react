import React, { useState } from "react";
import Card from "./../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";

import "./Expenses.css";

function Expenses(props) {
  const [selectedYear, setSelectedYear] = useState("All");

  const yearSelectedHandler = (event) => {
    setSelectedYear(event.target.value);
  };

  let filteredArray = props.expenses;

  if (selectedYear !== "All") {
    filteredArray = props.expenses.filter(
      (expenseItem) =>
        expenseItem.date.getFullYear().toString() === selectedYear
    );
  }

  return (
    <Card className="expenses">
      <ExpensesFilter
        onYearSelected={yearSelectedHandler}
        selected={selectedYear}
      />
      <ExpensesList items={filteredArray} />
    </Card>
  );
}

export default Expenses;
