import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useExpenses } from "../Expenses.jsx";
import ViewExpense from "../routes/ViewExpense";
import EditExpense from "../routes/EditExpense";
import SearchBar from "./SearchBar";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function RecentActivity({ openModal, closeModal }) {
    const { expenses, deleteExpense } = useExpenses();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredExpenses = expenses
        .filter((expense) =>
            expense.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="space-y-16 py-16 xl:space-y-20">
            <div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mx-auto max-w-2xl text-base font-semibold text-gray-900 lg:mx-0 lg:max-w-none">
                        Activité récente
                    </h2>
                    <SearchBar onSearch={setSearchQuery} />
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <table className="w-full text-left">
                                <thead className="sr-only">
                                <tr>
                                    <th>Montant</th>
                                    <th className="hidden sm:table-cell">Description</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredExpenses.map((expense) => (
                                    <Fragment key={expense.id}>
                                        <tr className="text-sm/6 text-gray-900">
                                            <td className="relative py-5 pr-6">
                                                <div className="flex gap-x-6">
                                                    <div className="flex-auto">
                                                        <div className="flex items-start gap-x-3">
                                                            <div className="text-md/6 font-bold text-gray-900">
                                                                {expense.amount} €
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                                <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                            </td>
                                            <td className="hidden py-5 pr-6 sm:table-cell">
                                                <div className="text-sm/6 text-gray-900">
                                                    {expense.title}
                                                </div>
                                            </td>
                                            <td className="py-5 text-right">
                                                <div className="flex justify-end">
                                                    <time dateTime={expense.date} className="text-sm/6 font-medium text-indigo-600 hover:text-indigo-500">
                                                        {expense.date}
                                                    </time>
                                                </div>
                                            </td>
                                            <td className="py-5 text-right">
                                                <Menu as="div" className="relative inline-block text-left">
                                                    <div>
                                                        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                                            <div className="py-1">
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <button
                                                                            onClick={() => openModal(<ViewExpense id={expense.id} closeModal={closeModal} />)}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                'block w-full text-left px-4 py-2 text-sm'
                                                                            )}
                                                                        >
                                                                            Détails
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <button
                                                                            onClick={() => openModal(<EditExpense id={expense.id} closeModal={closeModal} />)}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                'block w-full text-left px-4 py-2 text-sm'
                                                                            )}
                                                                        >
                                                                            Modifier
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <button
                                                                            onClick={() => deleteExpense(expense.id)}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                'block w-full text-left px-4 py-2 text-sm'
                                                                            )}
                                                                        >
                                                                            Supprimer
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            </div>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </td>
                                        </tr>
                                    </Fragment>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}