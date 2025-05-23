import Image from "next/image";
import { withAuth } from "@/utils/withAuth";
import Link from "next/link";

function HomePage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-center space-y-2">
        <h1>Seja bem vindo, você está no Task Plus</h1>
        <p>Meu projeto desafio com React JS e Sprint Boot.</p>
        <Link href={"/tasks"} className="py-3 px-3 rounded-md bg-purple-600 text-white mt-10">Ir para página inicial</Link>
      </div>
    </div>
  );
}

export default withAuth(HomePage)