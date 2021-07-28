import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import { useState } from "react";

const EXPENSES_INICIALES = [
   {
      id: "e1",
      title: "Papel Higienico",
      amount: 150,
      date: new Date(2020, 7, 25),
   },
   {
      id: "e2",
      title: "Seguro Auto",
      amount: 200,
      date: new Date(2020, 8, 10),
   },
   {
      id: "e3",
      title: "Jabon Liquido",
      amount: 300.32,
      date: new Date(2019, 2, 20),
   },
   {
      id: "e4",
      title: "Mesa de madera",
      amount: 1800.14,
      date: new Date(2019, 1, 5),
   },
   {
      id: "e5",
      title: "Computadora",
      amount: 20000.22,
      date: new Date(2019, 1, 1),
   },
   {
      id: "e6",
      title: "Microondas",
      amount: 15000,
      date: new Date(2021, 5, 23),
   },
];

function App() {
   const [expenses, setExpenses] = useState(EXPENSES_INICIALES);

   const addExpenseHandler = expense => {
      setExpenses(prevState => {
         return [...prevState, expense];
      });
   };

   return (
      <div>
         <NewExpense onAddExpense={addExpenseHandler} />
         <Expenses expenses={expenses} />
      </div>
   );
}

export default App;
