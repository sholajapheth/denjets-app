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
          <div className="flex flex-col items-center">
            <p className="italic my-4">New travel experience coming soon...</p>
            <Link href={"signup"} passHref>
              <button className="bg-blue-900 rounded-md px-4 py-2  text-white font-bold uppercase">
                sign up for updates
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
