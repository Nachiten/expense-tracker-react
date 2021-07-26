import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import Card from "./../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";

function Expenses(props) {

   const [selectedYear, setSelectedYear] = useState("2020");

   const yearSelectedHandler = (event) => {
      setSelectedYear(event.target.value);
   };

   return (
      <Card className="expenses">
         <ExpensesFilter onYearSelected={yearSelectedHandler} selected={selectedYear} />
         <ExpenseItem expense={props.expenses[0]} />
         <ExpenseItem expense={props.expenses[1]} />
         <ExpenseItem expense={props.expenses[2]} />
         <ExpenseItem expense={props.expenses[3]} />
      </Card>
   );
}

export default Expenses;
