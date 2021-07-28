import React, {useEffect} from "react";

import Chart from "../Chart/Chart";

const ExpensesChart = (props) => {
   let chartDataPoints;
   let totalMaximum = 0;

   // Si seleccionaste todos los años, el grafico muestra los gastos por año
   if (props.selectedYear.toString() === "All") {
      chartDataPoints = [
         { label: "2019", value: 0 },
         { label: "2020", value: 0 },
         { label: "2021", value: 0 },
         { label: "2022", value: 0 },
         { label: "2023", value: 0 },
      ];

      for (const expense of props.expenses) {
         const expenseYear = expense.date.getFullYear(); // starting at 0 => January = 0

         const expenseAmount = parseFloat(expense.amount);

         chartDataPoints[expenseYear - 2019].value += expenseAmount;
         totalMaximum += expenseAmount;
      }
   }
   // Si seleccionaste algun año, el grafico muestra los gastos por mes
   else {
      chartDataPoints = [
         { label: "Ene", value: 0 },
         { label: "Feb", value: 0 },
         { label: "Mar", value: 0 },
         { label: "Abr", value: 0 },
         { label: "May", value: 0 },
         { label: "Jun", value: 0 },
         { label: "Jul", value: 0 },
         { label: "Ago", value: 0 },
         { label: "Sep", value: 0 },
         { label: "Oct", value: 0 },
         { label: "Nov", value: 0 },
         { label: "Dic", value: 0 },
      ];

      for (const expense of props.expenses) {
         const expenseMonth = expense.date.getMonth(); // starting at 0 => January = 0

         const expenseAmount = parseFloat(expense.amount);

         chartDataPoints[expenseMonth].value += expenseAmount;
         totalMaximum += expenseAmount;
      }
   }

   useEffect(() => {
      props.setearTotalMaximum(totalMaximum);
   }, [props, totalMaximum]);

   console.log("Total maximum: " + totalMaximum);

   return <Chart dataPoints={chartDataPoints} totalMaximum={totalMaximum} />;
};

export default ExpensesChart;
