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

   const actualizarTotalMaximum = (valor) => {
      setTotalMaximum(valor);
   };

   let filteredArray = [];

   if (props.hayExpenses) {
      filteredArray = props.expenses.sort(
         (unExpense, otroExpense) => unExpense.date - otroExpense.date
      );

      if (selectedYear !== "All") {
         filteredArray = filteredArray.filter(
            (expenseItem) =>
               expenseItem.date.getFullYear().toString() === selectedYear
         );
      }
   }

   let expensesContent = <ExpensesList deleteExpenseHandler={props.deleteExpenseHandler} items={filteredArray} />;

   if (props.error) {
      expensesContent = (
         <h2 className="expenses-list__fallback">{props.error}</h2>
      );
   }

   if (props.isLoading) {
      expensesContent = (
         <h2 className="expenses-list__fallback">Cargando gastos ...</h2>
      );
   }

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
         {expensesContent}
      </Card>
   );
}

export default Expenses;
