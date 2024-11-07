import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const navigation = [
    { name: "Accueil", href: "#" }
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    return (
        <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex flex-1 items-center gap-x-6">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-3 p-3 md:hidden"
                    >
                        <span className="sr-only">Ouvrir le menu principal</span>
                        <Bars3Icon aria-hidden="true" className="h-5 w-5 text-gray-900" />
                    </button>
                </div>
                <nav className="hidden md:flex md:gap-x-11 md:text-sm/6 md:font-semibold md:text-gray-700">
                    {navigation.map((item, itemIdx) => (
                        <a key={itemIdx} href={item.href}>
                            {item.name}
                        </a>
                    ))}
                </nav>
                <div className="flex flex-1 items-center justify-end gap-x-8">
                    <button onClick={handleLogout} className="text-red-600 hover:underline">
                        Déconnexion
                    </button>
                </div>
            </div>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
                    <div className="-ml-0.5 flex h-16 items-center gap-x-6">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Fermer le menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-2 space-y-2">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                                {item.name}
                            </a>
                        ))}
                        <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-base/7 font-semibold text-red-600 hover:bg-gray-50">
                            Déconnexion
                        </button>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}