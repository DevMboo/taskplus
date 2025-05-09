import { RegisterForm } from "@/components/auth/RegisterForm";
import { withAuth } from "@/utils/withAuth";

import Link from "next/link";

function RegisterPage() {
    return (
        <div className=" bg-gray-50 flex flex-col justify-center py-3 sm:px-6 lg:px-8 px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Cadastre novo membro
                </h2>
                <p className="mt-2 text-center text-sm leading-5 text-neutral-300 max-w">
                    Ou {" "}
                </p>

                <div className="mx-auto">
                    <Link href="/tasks" className="font-medium absolute left-1/2 -translate-x-1/2 text-purple-600 hover:text-purple-600 focus:outline-none focus:underline transition ease-in-out duration-150">
                        Deseja voltar?
                    </Link>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}

export default withAuth(RegisterPage);