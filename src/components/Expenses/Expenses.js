import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import Card from "./../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";

function Expenses(props) {

   const [selectedYear, setSelectedYear] = useState("All");

   const yearSelectedHandler = (event) => {
      setSelectedYear(event.target.value);
   };

   let filteredArray = props.expenses;

   if (selectedYear != "All") {
      // eslint-disable-next-line
      filteredArray = props.expenses.filter(expenseItem => expenseItem.date.getFullYear() == selectedYear);
   }

   return (
      <Card className="expenses">
         <ExpensesFilter onYearSelected={yearSelectedHandler} selected={selectedYear} />

         {filteredArray.map(expenseItem => <ExpenseItem expense={expenseItem} key={expenseItem.id} />)}
      </Card>
   );
}

export default Expenses;
