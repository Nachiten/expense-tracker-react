import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import { useState, useEffect, useCallback } from "react";
import fire from "./fire";

//const BASE_URL = "https://http-requests-react-default-rtdb.firebaseio.com/";

function App() {
   const [expenses, setExpenses] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   async function deleteExpenseHandler(expenseId) {
      /*
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
      */
   }

   async function addExpenseHandler(expense) {
      setIsLoading(true);
      setError(false);

      let expensesRef = fire.database().ref("expenses");

      expensesRef
         .push()
         .set({
            amount: expense.amount,
            title: expense.title,
            date: expense.date.toString(),
         })
         .then(() => {
            fetchExpensesHandler();
            setIsLoading(false);
         })
         .catch((error) => setError(error.message));
   }

   function snapshotToArray(snapshot) {
      var returnArr = [];

      snapshot.forEach(function (childSnapshot) {
         var item = childSnapshot.val();
         item.key = childSnapshot.key;

         returnArr.push(item);
      });

      return returnArr;
   }

   const fetchExpensesHandler = useCallback(async () => {
      setIsLoading(true);
      setError(null);

      let expensesRef = fire.database().ref("expenses");

      // Attach an asynchronous callback to read the data at our posts reference
      expensesRef.on(
         "value",
         (snapshot) => {
            const incomingExpenses = snapshotToArray(snapshot);

            console.log(incomingExpenses);

            const mappedExpenses = incomingExpenses.map((unExpense) => {
               return {
                  amount: unExpense.amount,
                  title: unExpense.title,
                  date: new Date(unExpense.date),
                  id: unExpense.key,
               };
            });

            setExpenses(mappedExpenses);
            setIsLoading(false);
         },
         (errorObject) => {
            setError(errorObject.name);
         }
      );
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
