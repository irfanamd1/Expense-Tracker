import { useContext, useEffect, useRef, useState } from "react"
import { GiTakeMyMoney } from "react-icons/gi";
import { GiExpense } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import { AppContext } from "../context/AppContext";

const Amount = () => {

    const { total, setTotal, income, expense } = useContext(AppContext);

    const [isEdit, seIsEdit] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        if (isEdit && inputRef.current) {
        inputRef.current.focus();
        }
    }, [isEdit]);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-[#2f2f2f] rounded-lg w-full h-[120px] p-4">
        <p className="text-gray-200 mb-3">Total Balance</p>
        <div className="flex items-center justify-between text-gray-200">
            <div className="flex gap-1 items-center  text-xl">
                <p>₹</p>
                <input 
                    type="number" 
                    className="bg-transparent outline-none focus:border-b-3 border-b-[#9333ea] w-32 px-1" 
                    disabled={ !isEdit}
                    ref={ inputRef }
                    value={ total }
                    onChange={ (e) => setTotal(e.target.value)}
                    min={ 0 }
                />
                <button 
                    className="px-3 py-1.5 bg-violet-500 text-sm rounded-sm ml-4" 
                    onClick={ () => seIsEdit((curr) => !curr)}>{ isEdit ? 'Save' : 'Edit' }
                </button>
            </div>
            <div>
                <BsCashCoin className="w-10 h-10" />
            </div>
        </div>
      </div>
      <div className="bg-[#2f2f2f] rounded-lg w-full h-[120px] p-4">
        <p className="text-gray-200 mb-3">Income of {new Date().toLocaleString('default', { month: 'long' })}</p>
        <div className="flex items-center justify-between text-gray-200">
            <div className="flex gap-1 items-center  text-xl">
                <p>₹</p>
                <input 
                    type="number" 
                    className="bg-transparent outline-none focus:border-b-3 border-b-violet-600 w-32 px-1" 
                    disabled
                    value={ income }
                    min={ 0 }
                />
            </div>
            <div>
                <GiTakeMyMoney className="w-10 h-10" />
            </div>
        </div>
      </div>
      <div className="bg-[#2f2f2f] rounded-lg w-full h-[120px] p-4">
        <p className="text-gray-200 mb-3">Expenses of {new Date().toLocaleString('default', { month: 'long' })}</p>
        <div className="flex items-center justify-between text-gray-200">
            <div className="flex gap-1 items-center  text-xl">
                <p>₹</p>
                <input 
                    type="number" 
                    className="bg-transparent outline-none focus:border-b-3 border-b-violet-600 w-32 px-1" 
                    disabled
                    value={ expense }
                    min={ 0 }
                />
            </div>
            <div>
                <GiExpense  className="w-10 h-10" />
            </div>
        </div>
      </div>
      
    </div>
  )
}

export default Amount
