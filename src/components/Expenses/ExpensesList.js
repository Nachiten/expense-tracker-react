import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = (props) => {
   if (props.items.length === 0) {
      return (
         <h2 className="expenses-list__fallback">No se encontraron gastos</h2>
      );
   }

   return (
      <ul className="expenses-list">
         {props.items.map((expenseItem) => (
            <ExpenseItem deleteExpenseHandler={props.deleteExpenseHandler} expense={expenseItem} key={expenseItem.id} />
         ))}
      </ul>
   );
};

export default ExpensesList;
