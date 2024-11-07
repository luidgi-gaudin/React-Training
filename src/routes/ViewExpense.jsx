import { useParams } from "react-router-dom";
import { useExpenses } from "../context/expensesContext/ExpensesContext.jsx";
import { Link } from "react-router-dom";

export default function ViewExpense() {
    const { id } = useParams();
    const { expenses } = useExpenses();
    const expense = expenses.find((exp) => exp.id === parseInt(id));

    if (!expense) return <div>Loading...</div>;

    return (
        <div className="m-2 max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-2xl font-bold mb-4">{expense.title}</h3>
            <p className="text-lg mb-2">{expense.amount} €</p>
            <p className="text-lg mb-2">{expense.description}</p>
            <p className="text-lg mb-4">{expense.date}</p>
            <Link to="/" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500">
                Retour au menu
            </Link>
        </div>
    );
}