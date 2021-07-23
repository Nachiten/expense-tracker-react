import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

function App() {
   const expenses = [
      {
         id: "e1",
         title: "Papel Higienico",
         amount: 94.12,
         date: new Date(2020, 7, 25),
      },
      {
         id: "e1",
         title: "Seguro Auto",
         amount: 5200.42,
         date: new Date(2020, 8, 10),
      },
      {
         id: "e1",
         title: "Jabon Liquido",
         amount: 150.32,
         date: new Date(2019, 2, 20),
      },
      {
         id: "e1",
         title: "Mesa de madera",
         amount: 1800.14,
         date: new Date(2019, 1, 5),
      },
   ];

   return (
      <div>
         <NewExpense/>

         <Expenses expenses={expenses} />
      </div>
   );
}

export default App;
