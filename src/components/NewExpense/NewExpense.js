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

      setNewExpenseShowed(false);
   };

   return (
      <div className="new-expense">
         {newExpenseShowed ? (
            <ExpenseForm
               onSaveExpenseData={saveExpenseDataHandler}
               closeFormHandler={closeFormHandler}
            />
         ) : (
            <button onClick={openFormHandler}>Añadir Nuevo Gasto</button>
         )}
      </div>
   );
};

export default NewExpense;
