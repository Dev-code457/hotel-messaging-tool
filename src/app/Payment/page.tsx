import React from "react";
export default function Payment() {
    return (
        <>
            <section className="bg-white ">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
                            Choose the Plan That Best Fits Your Needs
                        </h2>
                        <p className="mb-5 font-light text-gray-500 sm:text-xl ">We offer a variety of plans for purchasing marketing and utility messages tailored to your business needs. Below is our showcase of available plans to help you find the perfect fit. Good luck!</p>
                    </div>
                    <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">

                        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 ">
                            <h3 className="mb-4 text-2xl font-semibold">Basic</h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">The perfect option for small business outlets and carts.</p>
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">₹ 10,000</span>
                                <span className="text-gray-500 dark:text-gray-400">/year</span>
                            </div>

                            <ul role="list" className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>500 Marketing Messages</span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>500 Utility Messages</span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>Customers Limit: <span className="font-semibold">50 Customers</span></span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-red-500 dark:text-red-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M15.293 4.293a1 1 0 00-1.414 0L10 9.586 6.121 5.707a1 1 0 00-1.414 1.414L8.586 11l-3.879 3.879a1 1 0 001.414 1.414L10 12.414l4.879 4.879a1 1 0 001.414-1.414L11.414 11l3.879-3.879a1 1 0 000-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>

                                    <span>Auto Add to Promotions</span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>Templates: <span className="font-semibold">3</span></span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-red-500 dark:text-red-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M15.293 4.293a1 1 0 00-1.414 0L10 9.586 6.121 5.707a1 1 0 00-1.414 1.414L8.586 11l-3.879 3.879a1 1 0 001.414 1.414L10 12.414l4.879 4.879a1 1 0 001.414-1.414L11.414 11l3.879-3.879a1 1 0 000-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>

                                    <span>Upload CSV File</span>
                                </li>

                                <li className="flex items-center space-x-3">

                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-red-500 dark:text-red-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M15.293 4.293a1 1 0 00-1.414 0L10 9.586 6.121 5.707a1 1 0 00-1.414 1.414L8.586 11l-3.879 3.879a1 1 0 001.414 1.414L10 12.414l4.879 4.879a1 1 0 001.414-1.414L11.414 11l3.879-3.879a1 1 0 000-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>

                                    <span>27/4 Technical Support</span>
                                </li>
                            </ul>
                            <a href="#" className="text-black bg-gray-200 hover:bg-primary-700 focus:ring-4  focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Get started</a>
                        </div>




                        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                            <h3 className="mb-4 text-2xl font-semibold">Standard</h3>
                            <p className="font-light text-gray-500 sm:text-lg ">Ideal for medium-scale businesses like cafes and hotels.</p>
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">₹ 12,000</span>
                                <span className="text-gray-500 dark:text-gray-400">/year</span>
                            </div>

                            <ul role="list" className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>1000 Marketing Messages</span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>1000 Utility Messages</span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>Customers Limit: <span className="font-semibold">300 Customers</span></span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>

                                    <span>Auto Add to Promotions</span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>Templates: <span className="font-semibold">5</span></span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>

                                    <span>Upload CSV File</span>
                                </li>

                                <li className="flex items-center space-x-3">

                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-red-500 dark:text-red-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M15.293 4.293a1 1 0 00-1.414 0L10 9.586 6.121 5.707a1 1 0 00-1.414 1.414L8.586 11l-3.879 3.879a1 1 0 001.414 1.414L10 12.414l4.879 4.879a1 1 0 001.414-1.414L11.414 11l3.879-3.879a1 1 0 000-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>

                                    <span>27/4 Technical Support</span>
                                </li>
                            </ul>
                            <a href="#" className="text-black bg-gray-200 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Get started</a>
                        </div>

                        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                            <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best suited for large hotels and upscale cafes</p>
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">₹ 15,000</span>
                                <span className="text-gray-500 dark:text-gray-400">/year</span>
                            </div>


                            <ul role="list" className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>2000 Marketing Messages</span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>2000 Utility Messages</span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>Customers Limit: <span className="font-semibold">500 Customers</span></span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>

                                    <span>Auto Add to Promotions</span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>Templates: <span className="font-semibold">8</span></span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>

                                    <span>Upload CSV File</span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>

                                    <span>27/4 Technical Support</span>
                                </li>
                            </ul>
                            <a href="#" className="text-black bg-gray-200 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Get started</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

