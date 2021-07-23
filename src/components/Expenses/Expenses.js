import React, {useState} from "react";
import ExpenseItem from "./ExpenseItem";
import Card from "./../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";

   // 1 - Create ExpenseFilter component (inside expenses)
   // 2 - Listen to changes on the dropdown
   // 3 - Make shure that the picked value is forwarded to the 
   //     expenses component (the value goes one level up)
   // 4 - Store the selected value on expenses on a state

function Expenses(props) {

   const [selectedYear, setSelectedYear] = useState("");

   const yearSelectedHandler = (event) => {
      console.log("Año seleccionado: " + event.target.value);

      setSelectedYear(event.target.value);
   };

   return (
      <Card className="expenses">

         <ExpensesFilter onYearSelected={yearSelectedHandler} />
         <p>{selectedYear}</p>
         <ExpenseItem expense={props.expenses[0]} />
         <ExpenseItem expense={props.expenses[1]} />
         <ExpenseItem expense={props.expenses[2]} />
         <ExpenseItem expense={props.expenses[3]} />
      </Card>
   );
}

export default Expenses;
