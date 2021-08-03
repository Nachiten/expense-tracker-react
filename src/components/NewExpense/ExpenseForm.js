import React, { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
   const [userInput, setUserInput] = useState({
      enteredTitle: "",
      enteredDate: "",
      enteredAmount: "",
   });

   const titleChangeHandler = (event) => {
      setUserInput((prevState) => {
         return {
            ...prevState,
            enteredTitle: event.target.value,
         };
      });
   };

   const dateChangeHandler = (event) => {
      setUserInput((prevState) => {
         return {
            ...prevState,
            enteredDate: event.target.value,
         };
      });
   };

   const amountChangeHandler = (event) => {
      setUserInput((prevState) => {
         return {
            ...prevState,
            enteredAmount: event.target.value,
         };
      });
   };

   const submitHandler = (event) => {
      event.preventDefault();

      console.log("Fecha Ingresada: ");
      console.log(userInput.enteredDate);

      const expenseData = {
         title: userInput.enteredTitle,
         amount: userInput.enteredAmount,
         date: new Date(userInput.enteredDate),
      };

      props.onSaveExpenseData(expenseData);

      resetFormValues();
   };

   const resetFormValues = () => {
      setUserInput({
         enteredTitle: "",
         enteredDate: "",
         enteredAmount: "",
      });
   };

   return (
      <form onSubmit={submitHandler}>
         <div className="new-expense__controls">
            <div className="new-expense__control">
               <label>Titulo</label>
               <input
                  type="text"
                  value={userInput.enteredTitle}
                  onChange={titleChangeHandler}
                  required
               />
            </div>
            <div className="new-expense__control">
               <label>Precio</label>
               <input
                  type="number"
                  value={userInput.enteredAmount}
                  min="0.01"
                  step="0.01"
                  onChange={amountChangeHandler}
                  required
               />
            </div>
            <div className="new-expense__control">
               <label>Fecha</label>
               <input
                  type="date"
                  value={userInput.enteredDate}
                  min="2019-01-01"
                  max="2023-12-31"
                  onChange={dateChangeHandler}
                  required
               />
            </div>
         </div>
         <div className="new-expense__actions">
            <button type="button" onClick={props.closeFormHandler}>
               Cancelar
            </button>
            <button type="submit">Añadir Gasto</button>
         </div>
      </form>
   );
};

export default ExpenseForm;
