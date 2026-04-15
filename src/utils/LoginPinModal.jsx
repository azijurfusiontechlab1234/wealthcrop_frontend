import { useState, useRef } from "react";
import { postApiWithToken } from "../api/api";
import { toastError, toastSuccess } from "../utils/notifyCustom";
import { isPinExpired } from "../utils/pinExpireChecker";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authenticationSlice";

function LoginPinModal({ onSuccess }) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const pinRefs = useRef([]);

  const navigate = useNavigate()
  const dispatch = useDispatch()

    const current = JSON.parse(localStorage.getItem("currentAccount"))
const username = current?.name
const email = current?.email
const phone = current?.phone
          

  const handlePinChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      pinRefs.current[index + 1].focus();
    }
    if (newPin.every(digit => digit != "" )) {
    handleVerifyPin(newPin);
  }
  };

 const handleKeyDown = (e, index) => {
  if (e.key === "Backspace") {
    if (!pin[index] && index > 0) {
      pinRefs.current[index - 1].focus();
    }
  }
};

 const handleVerifyPin = async (pinArray = pin) => {
    const url = `${import.meta.env.VITE_URL}${import.meta.env.VITE_VERIFY_PIN}`
    const rawPin = pinArray.join("");
    console.log("Verify Pin", rawPin);
    const current = JSON.parse(localStorage.getItem("currentAccount"))
    const phone = current?.phone
    try {
    //   if (pin.join("") !== confirmPin.join("")) {
    //     setError("Pins do not match. Please try again.");
    //     return;
    //   }
      const res = await postApiWithToken(url, {pin : Number(rawPin), phone })
      console.log("Verify Pin Response", res);
      
      if(res?.status === 200 || res?.status){

        setError("");
        const expiryTime = Date.now() +   5000
        localStorage.setItem("pin_expiry", expiryTime)
        onSuccess()
        // toastSuccess(res?.message);
        // navigate("/user/stocks/explore")
        // window.location.reload()
      }
    } catch (error) {
      toastError(error.res?.data?.message)
    }
    // setError("");
    //     toastSuccess("Pin set successfully!");
    //     // dispatch(login("temporary-token-pin-user"))
    //     navigate("/")
 
  };

const handleLogout = () => {
  onSuccess()
  localStorage.removeItem("currentAccount");
  dispatch(logout());
  navigate("/login");
};

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#020617] rounded-2xl p-6 w-[90%] max-w-sm">

        <div className="flex flex-col justify-center items-center ">
    <span className="text-xl font-semibold text-blue-950 dark:text-gray-100 mb-1">
    Hi, {username}
  </span>
  <span className="text-sm font-semibold text-blue-600 dark:text-gray-100 mb-4">
    Enter your 4-digit PIN 🔒
  </span>
  <div className="space-x-5 mb-8">
    <span className="text-md text-blue-900 font-semibold dark:text-gray-100">{email}</span> <button onClick={handleLogout} className="text-sm font-semibold text-blue-600 underline cursor-pointer hover:text-blue-950 dark:hover:text-blue-300">Logout</button>
  </div>
</div>

  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
     Use this PIN to access your account securely
  </p>

        <div className="flex justify-center gap-3 mb-4">
          {pin.map((digit, index) => (
            <input
              key={index}
              type="password"
              maxLength="1"
              value={digit}
              onChange={(e) =>
                handlePinChange(e.target.value, index)
              }
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (pinRefs.current[index] = el)}
              className="
          w-12 h-12 text-center rounded-lg text-lg
          border border-gray-300 dark:border-white/10
          bg-white dark:bg-white/5
          text-blue-950 dark:text-gray-100
          focus:outline-none focus:ring-1 focus:ring-blue-700
        "
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-center mb-3">
            {error}
          </p>
        )}

         <button
          onClick={handleVerifyPin}
          className="w-full py-2 text-sm font-semibold text-blue-600 underline cursor-pointer hover:text-blue-950 dark:hover:text-blue-300"
        >
          Forgot PIN?
        </button>

        {/* <button
          onClick={handleVerifyPin}
          className="w-full bg-blue-950 text-white py-2 rounded-lg"
        >
          Unlock
        </button> */}
      </div>
    </div>
  );
}

export default LoginPinModal;