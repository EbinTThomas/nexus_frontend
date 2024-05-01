"use client"

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import * as actions from '@/actions/index';
import axios from '@/api/axios';
import Link from 'next/link';
import Image from 'next/image';
import { FiLoader } from "react-icons/fi";

interface FormData {
    email: string;
    password: string;
}

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [formData]);

    const validateForm = (): boolean => {
        return formData.email !== '' && formData.password !== '';
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);

            const response = await axios.post('/api/v1/auth/token/', formData);

            if (response.status !== 200) {
                setErrMsg(response.data.message);
            } else {
                setErrMsg(null);
                const access = response.data.access_token;
                const setCookieAction = actions.setCookies.bind(null, access);
                setCookieAction();
                router.push('/projects');
            }
        } catch (error) {
            setErrMsg(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        className="mx-auto h-10 w-auto"
                        src="/assets/images/logo.svg"
                        alt="Your Company"
                        width={300}
                        height={20}
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit} >
                        {
                            errMsg &&
                            <div className="p-[1rem] bg-[#fef2f2] rounded-[0.375rem]">
                                <div className="flex">
                                    <div className="up">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="text-[#f87171] w-[1.25rem] h-[1.25rem]"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div className="ml-[0.75rem]">
                                        <h3 className="text-[#991b1b] text-[0.875rem] leading-[1.25rem] font-[500]">
                                            An Error occurred
                                        </h3>
                                        <div className="text-[#b91c1c] mt-[0.5rem] text-[0.875rem] leading-[1.25rem]">
                                            <p>{errMsg}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    type="email"
                                    id="email"
                                    placeholder="user@example.com"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    autoComplete="false"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center gap-2 items-center disabled:bg-indigo-200 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={!isFormValid || isLoading}
                            >
                                {
                                    isLoading
                                        ? <>
                                            Please wait
                                            <FiLoader />
                                        </>
                                        : 'Sign in'
                                }

                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have account?{' '}
                        <Link href="/auth/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};