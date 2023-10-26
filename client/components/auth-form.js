import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '@components/loginForm'
import bg from '@images/background.png'
import Image from 'next/image';

async function createUser(email, password, fullName, tel) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, fullName, tel }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

async function isEmailAlreadyUsed(email) {
  const response = await fetch('/api/auth/check-email', {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data.used;
}

function AuthForm() {
  const [registered, setRegistered] = useState(false)
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const telInputRef = useRef();
  const [error, setError] = useState();
  const router = useRouter();

  // function switchAuthModeHandler() {
  //   setIsLogin((prevState) => !prevState);
  // }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredTel = telInputRef.current.value;

    if (enteredName && enteredEmail && enteredPassword && enteredTel && passwordsMatch && enteredPassword.length >= 6) {
      try {
        const emailUsed = await isEmailAlreadyUsed(enteredEmail);
        if (emailUsed) {
          setError('อีเมลนี้ถูกใช้งานไปแล้ว');
        } else {
          // Proceed with user registration
          const result = await createUser(enteredEmail, enteredPassword, enteredName, enteredTel);
          setRegistered(true);
        }
      } catch (error) {
        console.log(error);
        setError(error)
      }
    } else {
      if (!enteredName) setError("กรุณากรอกชื่อ-สกุล ของคุณ");
      else if (!enteredEmail) setError("กรุณากรอกอีเมลของคุณ");
      else if (!enteredPassword) setError("กรุณากรอกรหัสผ่านของคุณ");
      else if (enteredPassword.length < 6) setError("รหัสผ่านควรมี 6 ตัวอักษรขึ้นไป");
      else if (!enteredTel) setError('กรุณากรอกเบอร์โทรศัพท์ของคุณ');
      else if (!passwordsMatch) setError('กรุณากรอกรหัสผ่านให้ตรงกัน');
      else setError("กรุณากรอกข้อมูลให้ครบทุกช่อง")
    }
  }

  const [focusPassword, setFocusPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!focusPassword) {
      setPassword(e.target.value);
      setPasswordsMatch(e.target.value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  async function checkEmailAvailability(email) {
    try {
      const emailUsed = await isEmailAlreadyUsed(email);
      if (emailUsed) {
        setError('อีเมลนี้ถูกใช้งานไปแล้ว');
      } else {
        setError(null); // Clear any previous error message
      }
    } catch (error) {
      setError(error.message || 'มีอะไรบางอย่างผิดพลาด!');
    }
  }

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-14 lg:px-8 bg-white font-ibm'>
        {!registered ? (
          <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm z-10">
              <h2 className="my-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                สร้างบัญชีใหม่
              </h2>
              <p className="text-md text-center text-gray-500">
                เริ่มต้นสร้างบัญชีใหม่ กรอกข้อมูลของคุณและเริ่มจองห้องประชุม
              </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div className="relative z-0 w-full mb-6 group text-left">
                  <input type="text" name="floating_name" id="floating_name"
                    className="block py-3.5 px-0 w-full font-light text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                    placeholder=" "
                    required
                    ref={nameInputRef}
                  />
                  <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ชื่อ-สกุล *</label>
                </div>

                <div className="relative z-0 w-full my-6 group text-left">
                  <input type="email" name="floating_email" id="floating_email"
                    className="block py-3.5 px-0 w-full text-md font-light text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                    placeholder=" "
                    required
                    ref={emailInputRef}
                    onBlur={() => {
                      const enteredEmail = emailInputRef.current.value;
                      if (enteredEmail) {
                        checkEmailAvailability(enteredEmail);
                      }
                    }}                  
                  />
                  <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">อีเมล *</label>
                </div>

                <div className="relative z-0 w-full mb-6 group text-left">
                  <input type="password" name="floating_password" id="floating_password"
                    className="block py-3.5 px-0 w-full font-light text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                    placeholder=" "
                    required
                    ref={passwordInputRef}
                    value={password}
                    onChange={handlePasswordChange}
                    onFocus={() => { setFocusPassword(true) }}
                  />
                  <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รหัสผ่าน *</label>
                </div>

                <div className="relative z-0 w-full mb-6 group text-left">
                  <input type="password" name="floating_conpassword" id="floating_conpassword"
                    className="block py-3.5 px-0 w-full font-light text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                    placeholder=" "
                    required
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  <label htmlFor="floating_conpassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ยืนยันรหัสผ่าน *</label>
                </div>

                <div className="relative z-0 w-full mb-6 group text-left">
                  <input type="tel" name="floating_tel" id="floating_tel"
                    className="block py-3.5 px-0 w-full font-light text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                    placeholder=" "
                    required
                    ref={telInputRef}
                  />
                  <label htmlFor="floating_tel" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">เบอร์โทรศัพท์ *</label>
                </div>
                {!passwordsMatch && <p className="text-red-500">กรุณาป้อนรหัสผ่านให้ตรงกัน</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div>
                  <button
                    type="button"
                    onClick={submitHandler}
                    className="mb-2 w-full justify-center rounded-md mr-3.5 bg-[#3E99EC] px-2 py-3 text-md font-semibold text-white transition-all duration-200 hover:scale-105"

                  >
                    สร้างบัญชีใหม่
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-md text-gray-500">
                ฉันมีบัญชีแล้ว?{' '}<LoginForm className='text-lg text-gray-900 font-medium hover:underline transition-all duration-200 hover:scale-105 mx-2' />
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm h-[29.65em]">
              <h2 className="my-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                สร้างบัญชีใหม่สำเร็จ!
              </h2>
              <p className="text-md text-center text-gray-500">
                เข้าสู่ระบบ และเริ่มต้นจองห้องประชุมได้แล้ววันนี้
              </p>
              <LoginForm className='mt-8 mb-2 w-full justify-center rounded-md mr-3.5 bg-[#3E99EC] px-2 py-3 text-md font-semibold text-white transition-all duration-200 hover:scale-105' />
              <button
                type="button"
                onClick={() => router.push('/')}
                className="mb-2 w-full justify-center rounded-md mr-3.5 bg-white px-2 py-3 text-md font-semibold text-gray-800 transition-all duration-200 hover:scale-105"
              >
                กลับหน้าหลัก
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}


export default AuthForm;
