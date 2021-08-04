import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import { useState, useEffect, useCallback } from "react";
import fire from "./fire";

function App() {
   const [expenses, setExpenses] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   const [newExpense, setNewExpense] = useState({
      enteredTitle: "",
      enteredDate: "",
      enteredAmount: "",
   });

   function editExpenseHandler(expense) {
      setNewExpense({
         enteredTitle: expense.title,
         enteredAmount: expense.amount,
         enteredDate: fromDateToString(expense.date),
      });

      console.log("Expense title: " + newExpense.enteredTitle);
      console.log("Expense amount: " + newExpense.enteredAmount);
      console.log("Expense date: " + newExpense.enteredDate);
      console.log("Edit expense handler");

      deleteExpenseHandler(expense.id);
   }

   function fromDateToString(d) {
      var month = "" + (d.getMonth() + 1),
         day = "" + d.getDate(),
         year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
   }

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
         <NewExpense
            title={newExpense.enteredTitle}
            amount={newExpense.enteredAmount}
            date={newExpense.enteredDate}
            onAddExpense={addExpenseHandler}
         />
         <Expenses
            expenses={expenses}
            hayExpenses={expenses.length > 0}
            error={error}
            isLoading={isLoading}
            deleteExpenseHandler={deleteExpenseHandler}
            editExpenseHandler={editExpenseHandler}
         />
      </div>
   );
}

export default App;
