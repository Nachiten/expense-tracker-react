import React, { useState } from "react";
import Card from "./../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

import "./Expenses.css";

function Expenses(props) {
   const [selectedYear, setSelectedYear] = useState("All");
   const [totalMaximum, setTotalMaximum] = useState(0);

   const yearSelectedHandler = (event) => {
      setSelectedYear(event.target.value);
   };

   let filteredArray = props.expenses.sort(
      (unExpense, otroExpense) => unExpense.date - otroExpense.date
   );

   if (selectedYear !== "All") {
      filteredArray = props.expenses.filter(
         (expenseItem) =>
            expenseItem.date.getFullYear().toString() === selectedYear
      );
   }

   const actualizarTotalMaximum = (valor) => {
      setTotalMaximum(valor);
   };

   return (
      <Card className="expenses">
         <ExpensesFilter
            onYearSelected={yearSelectedHandler}
            selected={selectedYear}
            totalGastado={totalMaximum}
         />
         <ExpensesChart
            expenses={filteredArray}
            selectedYear={selectedYear}
            setearTotalMaximum={actualizarTotalMaximum}
         />
         <ExpensesList items={filteredArray} />
      </Card>
   );
}

export default Expenses;
