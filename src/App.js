import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import { useState, useEffect, useCallback } from "react";

const BASE_URL = "https://http-requests-react-default-rtdb.firebaseio.com/";

function App() {
   const [expenses, setExpenses] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   async function deleteExpenseHandler(expenseId) {
      console.log(expenseId);
      try {
         const response = await fetch(BASE_URL + "expenses/" + expenseId, {
            method: "DELETE",
            body: expenseId,
            headers: {
               "Content-Type": "application/json",
            },
         });

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         fetchExpensesHandler();
      } catch (error) {
         setError(error.message);
      }
   }

   async function addExpenseHandler(expense) {
      try {
         const response = await fetch(BASE_URL + "expenses.json", {
            method: "POST",
            body: JSON.stringify(expense),
            headers: {
               "Content-Type": "application/json",
            },
         });

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         fetchExpensesHandler();

      } catch (error) {
         setError(error.message);
      }
   };

   const fetchExpensesHandler = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      try {
         const response = await fetch(BASE_URL + "expenses.json");
         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const data = await response.json();

         const loadedExpenses = [];

         for (const key in data) {
            loadedExpenses.push({
               id: key,
               amount: data[key].amount,
               date: new Date(data[key].date),
               title: data[key].title,
            });
         }

         setExpenses(loadedExpenses);
      } catch (error) {
         setError(
            <div>
               <p>Ha Habido un error :(</p>
               <p>Mensaje: {error.message}</p>
            </div>
         );
      }
      setIsLoading(false);
   }, []);

   useEffect(() => {
      fetchExpensesHandler();
   }, [fetchExpensesHandler]);

   return (
      <div>
         <NewExpense onAddExpense={addExpenseHandler} />
         <Expenses
            expenses={expenses}
            hayExpenses={expenses.length > 0}
            error={error}
            isLoading={isLoading}
            deleteExpenseHandler={deleteExpenseHandler}
         />
      </div>
   );
}

export default App;
