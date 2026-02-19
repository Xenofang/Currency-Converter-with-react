import { useState } from 'react'
import {InputBox} from "./components"
import useCurrency from './hooks/useCurrency' 


function App() {
const [amount, setAmount] = useState(1);
const [from, setFromCurrencyID] = useState("usd");
const [to, setToCurrencyID] = useState("inr");
const [convertedAmt, setConvertedAmt] = useState(0); // ✅ number

const data = useCurrency(from); // ✅ hook at top level
const options = Object.keys(data || {});

const swap = () => {
  setFromCurrencyID(to);
  setToCurrencyID(from);
  setConvertedAmt(amount);
  setAmount(convertedAmt);
};

const convert = () => {
  if (!data || !data[to]) return; // ✅ safety check
  setConvertedAmt(amount * data[to]); // ✅ correct logic
}

      return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/12960362/pexels-photo-12960362.jpeg')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                          convert(); 
                        }}
                    >
                        <div className="w-full mb-1 text-2xl">
                            <InputBox
                                label="From"
                                amount = {amount}
                                currencyOption={options}
                                onAmountChange={(amount)=> setAmount(amount)}
                                onCurrencyChange = {(currency)=>setFromCurrencyID(currency)}
                                selectCurrency ={from}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount = {convertedAmt}
                                currencyOption = {options}
                                onCurrencyChange = {(currency) =>setToCurrencyID(Number(Math.floor(currency.toFixed(2))))}
                                selectCurrency ={to}
                                amountDisable
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}

                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
 
}

export default App
