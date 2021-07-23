import "./ExpenseDate.css";

function ExpenseDate(props) {
   const month = props.date.toLocaleString("es-AR", { month: "long" });
   const year = props.date.getFullYear();
   const day = props.date.toLocaleString("es-AR", { day: "2-digit" });

   const capitalizeFirstLetter = (
      [first, ...rest],
      locale = navigator.language
   ) => first.toLocaleUpperCase(locale) + rest.join("");

   return (
      <div className="expense-date">
         <div className="expense-date__month">{capitalizeFirstLetter(month)}</div>
         <div className="expense-date__day">{day}</div>
         <div className="expense-date__year">{year}</div>
      </div>
   );
}

export default ExpenseDate;
