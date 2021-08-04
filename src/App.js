import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import { useState, useEffect, useCallback } from "react";
import fire from "./fire";

function App() {
   const [expenses, setExpenses] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   async function deleteExpenseHandler(expenseId) {
      setError(null);
      setIsLoading(true);

      let expensesRef = fire.database().ref("expenses");

      expensesRef
         .child(expenseId)
         .remove()
         .then(fetchExpensesHandler())
         .catch((error) => setError(error.message))
         .finally(setIsLoading(false));
   }

   async function addExpenseHandler(expense) {
      setError(null);
      setIsLoading(true);

      let expensesRef = fire.database().ref("expenses");

      expensesRef
         .push()
         .set({
            amount: expense.amount,
            title: expense.title,
            date: expense.date.toString(),
         })
         .then(fetchExpensesHandler())
         .catch((error) => setError(error.message))
         .finally(setIsLoading(false));
   }

   const fetchExpensesHandler = useCallback(async () => {
      setIsLoading(true);
      setError(null);

      let expensesRef = fire.database().ref("expenses");

      expensesRef.on(
         "value",
         (snapshot) => {
            const incomingExpenses = snapshotToArray(snapshot);

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
            setIsLoading(false);
         }
      );
   }, []);

   useEffect(() => {
      fetchExpensesHandler();
   }, [fetchExpensesHandler]);

   function snapshotToArray(snapshot) {
      var returnArr = [];

      snapshot.forEach(function (childSnapshot) {
         var item = childSnapshot.val();
         item.key = childSnapshot.key;

         returnArr.push(item);
      });

      return returnArr;
   }

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
