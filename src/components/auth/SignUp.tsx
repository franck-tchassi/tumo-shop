"use client"

import React, { useActionState } from 'react'
import { Loader2 } from "lucide-react"
import Link from 'next/link'

const initialState = {
    message: '',
}

type SignUpProps = {
    action: (prevState: any, formData: FormData) => Promise<{message: string | undefined}>
}

const SignUp = ({ action }: SignUpProps) => {
    const [state, formAction, isPending] = useActionState(action, initialState)
    
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">
                YOUR <span className="font-bold">TÜMO</span> JOURNEY STARTS HERE
                </h2>
                <p className="mt-4 text-sm text-gray-600">
                    Sign up now and get <span className="font-bold text-rose-600">90% OFF</span> your first order!
                </p>
                
                <div className="mt-4 bg-rose-50 border border-rose-100 rounded-lg p-3 inline-flex items-center">
                    <span className="text-xs font-medium text-rose-800">
                        ⏳ Only 127 welcome packages remaining! Offer expires in 13:45
                    </span>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form action={formAction} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                                    placeholder="At least 8 characters"
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                                Password must be at least 8 characters
                            </p>
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    required
                                    className="focus:ring-rose-500 h-4 w-4 text-rose-600 border-gray-300 rounded"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-medium text-gray-700">
                                    I agree to the{' '}
                                    <Link href="/terms" className="text-rose-600 hover:text-rose-500">
                                        Terms
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="/privacy" className="text-rose-600 hover:text-rose-500">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full flex justify-center py-2 px-4 border cursor-pointer border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-200"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                        Creating account...
                                    </>
                                ) : 'CREATE ACCOUNT'}
                            </button>
                        </div>

                        {state?.message && (
                            <p className="mt-2 text-center text-sm text-red-600">
                                {state.message}
                            </p>
                        )}
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href="/auth/sign-in"
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="mt-6 text-center text-xs text-gray-500">
                    <p>Free shipping on orders over $15.00</p>
                    <p className="mt-1">30-day money back guarantee</p>
                </div>
            </div>
        </div>
    )
}

export default SignUp