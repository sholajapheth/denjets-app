import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen ">
      <div>
        <Image
          src="/denjets.png"
          alt="Denjets Logo"
          className=""
          width={150}
          height={24}
          layout="responsive"
        />

        <div className="w-full flex mt-4  md:mt-8 items-center justify-center ">
          <Link href={"signup"} passHref>
            <button className="bg-black rounded-md px-4 py-2 uppercase text-white font-bold">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
