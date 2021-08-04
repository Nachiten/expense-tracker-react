import React, { useState } from "react";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
   const [newExpenseShowed, setNewExpenseShowed] = useState(false);

   const closeFormHandler = () => {
      setNewExpenseShowed(false);
   };

   const openFormHandler = () => {
      setNewExpenseShowed(true);
   };

   const saveExpenseDataHandler = (enteredExpenseData) => {
      props.onAddExpense(enteredExpenseData);
   };

   return (
      <div className="new-expense">
         {newExpenseShowed ? (
            <ExpenseForm
               onSaveExpenseData={saveExpenseDataHandler}
               closeFormHandler={closeFormHandler}
               title={props.title} amount={props.amount} date={props.date}
            />
         ) : (
            <button onClick={openFormHandler}>Añadir Nuevo Gasto</button>
         )}
      </div>
   );
};

export default NewExpense;
