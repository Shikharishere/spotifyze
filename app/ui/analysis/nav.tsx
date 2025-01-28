"use client";
import {motion} from "framer-motion";
import { useState, useEffect } from "react";
import NavButton from "./navbutton";
import { AnimatePresence } from "framer-motion";
import { Home, BarChart2, MoreVertical, SeparatorHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteUser } from "@/app/lib/db";
import { logout, deleteAccount} from "@/app/lib/auth";
import { useRouter } from 'next/navigation';


export function Nav() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const unlink = () => {
        setLoading(true);
        logout();
	    setTimeout(() => {
          	setLoading(false);
            router.push('/');
	    }, 3000);
    }
    const removeAccount = () => {
        setLoading(true);
        logout();
	    setTimeout(() => {
          	setLoading(false);
            router.push('/');
	    }, 3000);
    }


    

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-4 py-4 flex justify-center items-center">
                <div className="flex space-x-2 sm:space-x-4 items-center">
                    <NavButton href="/analysis/artists">Artists</NavButton>
                    <NavButton href="/analysis/tracks">Tracks</NavButton>
                    <NavButton href="/analysis/genres">Genres</NavButton>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="p-2 rounded-full hover:bg-[#1DB954] text-[#1DB954] hover:text-white transition-colors"
                        >
                        <MoreVertical className="w-6 h-6" />
                    </button>
                </div>
                <AnimatePresence>
                    {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .5}}
                        className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ duration: .5}}
                        className="bg-white rounded-lg p-6 shadow-xl border border-[#1DB954] border-opacity-40 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col space-y-4">
                                <Link 
                                    onClick={() => setIsModalOpen(false)}
                                    href="/" 
                                    className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[#1DB954] hover:text-white transition-colors"
                                >
                                    <Home className="w-5 h-5" />
                                    <span>Home</span>
                                </Link>
                                <Link
                                    onClick={() => setIsModalOpen(false)}   
                                    href="/analysis" 
                                    className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[#1DB954] hover:text-white transition-colors"
                                >
                                    <BarChart2 className="w-5 h-5" />
                                    <span>Analysis</span>
                                </Link>
                                <hr />
                                <Link
                                    href="#" 
                                    className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition-colors"
                                    onClick={unlink}
                                >
                                    <Trash2 className="w-5 h-5" />
                                    {loading ? <span>Logging out...</span> : <span>Log Out</span>}
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition-colors"
                                    onClick={removeAccount}
                                >
                                    <Trash2 className="w-5 h-5"/>
                                    {loading ? <span>Deleting...</span> : <span>Delete Account</span>}
                                </Link>
                            </div>
                            
                        </motion.div>
                    </motion.div>
                    )}
                </AnimatePresence>
            </div>
      </motion.nav>
    );
}
