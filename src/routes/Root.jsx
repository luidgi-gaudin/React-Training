import {Link, Outlet} from "react-router-dom";
import Header from "../Components/Header";
import Stats from "../Components/Stats";
import { PlusSmallIcon } from "@heroicons/react/20/solid";

const secondaryNavigation = [
    { name: "7 derniers jours", href: "#", current: true },
    { name: "30 derniers jours", href: "#", current: false },
    { name: "Toujours", href: "#", current: false },
];

export default function Root() {

    return (
        <>
            <Header />
            <main>
                <div className="relative isolate overflow-hidden pt-16">
                    <header className="pb-4 pt-6 sm:pb-6">
                        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
                            <h1 className="text-base/7 font-semibold text-gray-900">Dépenses</h1>
                            <div className="order-last flex w-full gap-x-8 text-sm/6 font-semibold sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:text-sm/7">
                                {secondaryNavigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={item.current ? "text-indigo-600" : "text-gray-700"}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <Link
                                to="/depense/cree"
                                className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <PlusSmallIcon aria-hidden="true" className="-ml-1.5 h-5 w-5" />
                                Nouvelle dépense
                            </Link>
                        </div>
                    </header>
                    <Stats />
                    <div
                        aria-hidden="true"
                        className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
                    >
                        <div
                            style={{
                                clipPath:
                                    "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
                            }}
                            className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                        />
                    </div>
                </div>
                <Outlet />
            </main>
        </>
    );
}