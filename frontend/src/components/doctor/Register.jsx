import { LockClosedIcon } from '@heroicons/react/20/solid'
import Header from '../Header'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { generateString } from '../Functions'

function FirstPage(props) {
  const [match, setMatch] = useState(1);
  const [exist, setExist] = useState(0);
  function handleNext(event) {
    if (event.target.password.value === event.target.confirmPassword.value) {
      axios.post(process.env.REACT_APP_API + "/doctor/register", { email: event.target.email.value, password: event.target.password.value }).then(res => {
        console.log(res.data.status);
        if (res.data.status === 'done') {
          props.setNext(1);
          props.setEmail(event.target.email.value);
        } else
          setExist(1);
      })
    }
    else setMatch(0);
    event.preventDefault();
  }
  return <>
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/logo.png"
            alt=""
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up as Doctor
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <NavLink to="/doctor/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </NavLink>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleNext} method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            {exist ? <p>Email already registered</p> : ""}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full  border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirmpassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmpassword"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                placeholder="Confirm Password"
              />
            </div>
            {match ? "" : <p style={{ "color": "red" }}>Password didn't match...</p>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
            </div>

            <div className="text-sm">
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
}

function SecondPage(props) {
  const navigate = useNavigate();
  function handleSave(event) {
    const sessionKey = generateString(20);
    const { FName, LName, registration, degree, fees, mobile, gender, DOB, street, city, state, pinCode } = event.target;
    const data = {
      "email": props.email,
      "sessionKey": sessionKey,
      "name": { "FName": FName.value, "LName": LName.value },
      "registration": registration.value,
      "degree": degree.value,
      "fees": fees.value,
      "mobile": mobile.value,
      "gender": gender.value,
      "DOB": DOB.value,
      "address": {
        "street": street.value,
        "city": city.value,
        "state": state.value,
        "pin": pinCode.value
      }
    }

    event.preventDefault();
    axios.post(process.env.REACT_APP_API + "/doctor/profile", data).then(res => {
      console.log("save a Clicked")
      navigate("/doctor/dashboard", { state: res.data });
      localStorage.setItem("currentPage", "Basic");
    }).catch(err => console.log(err));
  }
  return <>
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/logo.png"
            alt=""
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up as Doctor
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSave} method="POST">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Fill the details carefully</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  First name(without Dr)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="FName"
                    id="first-name"
                    required
                    autoComplete="given-name"
                    placeholder='First Name'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="LName"
                    id="last-name"
                    placeholder='Last Name'
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="reg-no" className="block text-sm font-medium leading-6 text-gray-900">
                  Registration No.
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="registration"
                    id="reg"
                    required
                    placeholder='Registration No'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="degree" className="block text-sm font-medium leading-6 text-gray-900">
                  Degree
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="degree"
                    id="degree"
                    required
                    placeholder='e.g. MBBS, MD in Cardiology'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="fees" className="block text-sm font-medium leading-6 text-gray-900">
                  Fees in Rupees
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    min="1"
                    step='any'
                    name="fees"
                    id="fees"
                    required
                    placeholder='e.g. 500'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="tel" className="block text-sm font-medium leading-6 text-gray-900">
                  Mobile Number
                </label>
                <div className="mt-2">
                  <input
                    id="mobile"
                    name="mobile"
                    type="mobile"
                    autoComplete="tel"
                    required
                    placeholder='Mobile Number'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                  Gender
                </label>
                <div className="mt-2">
                  <select
                    id="gender"
                    name="gender"
                    autoComplete="gender"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Transgender</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-gray-900">
                  Date of Birth
                </label>
                <div className="mt-2">
                  <input
                    id="birthday"
                    name="DOB"
                    type="date"
                    autoComplete="birthday"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                  Street Address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street"
                    id="street-address"
                    placeholder='Street Address'
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder='City'
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                  State
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="state"
                    id="state"
                    autoComplete="address-level1"
                    placeholder='State'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                  PIN Code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="pinCode"
                    id="postal-code"
                    autoComplete="postal-code"
                    placeholder='PIN Code'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
}

export default function Register() {
  const [next, setNext] = useState(0);
  const [email, setEmail] = useState(null);
  return (
    <>
      <Header />
      {next === 0 ? <FirstPage setNext={setNext} setEmail={setEmail} /> : <SecondPage email={email} />}

    </>
  )
}