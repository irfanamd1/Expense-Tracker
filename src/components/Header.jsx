import { FaWallet } from "react-icons/fa";


const Header = () => {
  return (
    <div className="flex items-center gap-3 py-8">
        <FaWallet className="w-6 h-6 text-[#9333ea]" />
        <h1 className="text-2xl text-white font-bold">Expense Tracker</h1>
    </div>
  )
}

export default Header
