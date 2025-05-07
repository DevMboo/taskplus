import { withPublic } from "@/utils/withPublic";

import Image from 'next/image';

import { LoginForm } from '@/components/auth/LoginForm';


function LoginPage() {
    return (
        <div className=" bg-gray-50 flex flex-col justify-center py-3 sm:px-6 lg:px-8 px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image
                    className="mx-auto h-10 w-auto"
                    src="/ico.png"
                    alt="Logo app"
                    width={40}
                    height={40}
                />
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Entre na sua conta
                </h2>
                <p className="mt-2 text-center text-sm leading-5 text-neutral-300 max-w">
                    Ou {" "}
                </p>

                <div className="mx-auto">
                    <a
                        href="#"
                        className="font-medium absolute left-1/2 -translate-x-1/2 text-purple-600 hover:text-purple-600 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                        Ainda não possui conta?
                    </a>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default withPublic(LoginPage);
