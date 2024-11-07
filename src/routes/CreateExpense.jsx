import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useExpenses } from "../context/expensesContext/ExpensesContext.jsx";

export default function CreateExpense() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const { addExpense } = useExpenses();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addExpense({ title, amount, description, date });
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit} className="m-2 max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Créer une dépense</h2>
            <input
                type="text"
                placeholder="Titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 mb-4 border rounded"
            />
            <input
                type="number"
                placeholder="Montant"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full p-2 mb-4 border rounded"
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-2 mb-4 border rounded"
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-between">
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">
                    Ajouter
                </button>
                <Link to={'/'} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500">
                    Annuler
                </Link>
            </div>
        </form>
    );
}