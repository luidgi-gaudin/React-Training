import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExpenses } from "../Expenses.jsx";

export default function EditExpense({ id, closeModal }) {
    const { expenses, editExpense } = useExpenses();
    const navigate = useNavigate();
    const [expense, setExpense] = useState({
        title: "",
        amount: "",
        description: "",
        date: ""
    });

    useEffect(() => {
        const fetchedExpense = expenses.find((exp) => exp.id === parseInt(id));
        if (fetchedExpense) {
            setExpense(fetchedExpense);
        }
    }, [id, expenses]);

    const handleSubmit = (e) => {
        e.preventDefault();
        editExpense(parseInt(id), expense);
        closeModal();
        navigate(`/`);
    };

    if (!expense) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Modifier la dépense</h2>
            <input
                type="text"
                placeholder="Titre"
                value={expense.title}
                onChange={(e) => setExpense({ ...expense, title: e.target.value })}
                required
                className="w-full p-2 mb-4 border rounded"
            />
            <input
                type="number"
                placeholder="Montant"
                value={expense.amount}
                onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                required
                className="w-full p-2 mb-4 border rounded"
            />
            <input
                type="text"
                placeholder="Description"
                value={expense.description}
                onChange={(e) => setExpense({ ...expense, description: e.target.value })}
                required
                className="w-full p-2 mb-4 border rounded"
            />
            <input
                type="date"
                value={expense.date}
                onChange={(e) => setExpense({ ...expense, date: e.target.value })}
                required
                className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-between">
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">
                    Modifier
                </button>
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500">
                    Annuler
                </button>
            </div>
        </form>
    );
}