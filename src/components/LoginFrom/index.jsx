import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from "axios";

const LoginFrom = ({userName, changeName, changeDate, userDate, changeRes}) => {
    const [open, setOpen] = useState(true);
    const [showError, setShowError] = useState(false)
    const [errorText, setErrorText] = useState("");

    const reqDate = () =>{
        if (userName !== ""){
            try{
                axios.get(`https://api.nasa.gov/planetary/apod?api_key=HY5ecrJjBxuPtk9piOBe8iynAqaQDHamKnSbhdYz&date=${userDate}`)
                    .then(res =>{
                        changeRes(res.data);
                        axios.post("https://60f54d102208920017f39ff9.mockapi.io/nasaApod",
                            {
                                name: userName,
                                date: userDate
                            }, {
                                headers:{
                                    'Content-Type': 'application/json'
                                }
                            })
                    })
                    .catch(e => {
                        setErrorText(e.response.data.msg);
                        setShowError(true)
                        setOpen(true)
                        axios.post("https://60f54d102208920017f39ff9.mockapi.io/nasaApod",
                            {
                                name: userName,
                                date: userDate,
                                error: "Error date"
                            }, {
                                headers:{
                                    'Content-Type': 'application/json'
                                }
                            })
                    });
                setOpen(false)
            }catch (e){
                console.log(e);
            }
        }else {
            setOpen(true)
        }
    }


    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => reqDate}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                Hello my friend !
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <input
                                                    className="my-[15px] block w-full rounded-md border border-gray-300 outline-none py-[5px] pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    type="text"
                                                    value={userName}
                                                    onChange={(e) => changeName(e.target.value)}
                                                    placeholder="Name"
                                                />
                                                <input
                                                    className="block w-full rounded-md border border-gray-300 outline-none py-[5px] pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    onChange={(e) => changeDate(e.target.value)}
                                                    type="date"
                                                />
                                                {
                                                    showError ?
                                                        <p className="text-red-600">{errorText}</p>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={reqDate}
                                    >
                                        Go!
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default LoginFrom;