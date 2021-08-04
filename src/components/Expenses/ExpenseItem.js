import React from "react";

import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";

function ExpenseItem(props) {
  const expense = props.expense;

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={expense.date} />
        <div className="expense-item__description">
          <h2>{expense.title}</h2>
          <div className="expense-item__price">${expense.amount}</div>
          <button className="expense-item__button" onClick={() => props.deleteExpenseHandler(expense.id)}>Eliminar</button>
          <button className="expense-item__button" onClick={() => props.editExpenseHandler(expense)}>Editar</button>
        </div>
      </Card>
    </li>
  );
}
export default ExpenseItem;
