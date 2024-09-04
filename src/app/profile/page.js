import React from "react";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { doLogout } from "@/app/actions";

async function Profile() {
  const session = await auth();
  console.log("session : ", session);
  console.log(session?.user?.email);
  

  return (
    <div className="flex flex-col items-center w-full max-w-4xl min-h-screen bg-gray-200 p-4">
      <div className="flex flex-col justify-between w-full h-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        {session?.user?.name && session?.user?.image ? (
          <div>
            <div className="flex justify-center mb-4">
              <Image
                src={session?.user?.image}
                alt={session?.user?.name}
                width={72}
                height={72}
                className="rounded-full"
              />
            </div>
            <h1 className="text-3xl font-bold text-center mb-4">
              Welcome, {session?.user?.name}
            </h1>
            <p className="font-bold text-center mb-4">{session?.user?.email}</p>
          </div>
        ) : (
          <div>
            {" "}
            {/* Added a parent <div> here */}
            <h1 className="text-3xl font-bold text-center mb-4">
              Welcome, {session?.user?.name}
            </h1>
            <p className="text-3xl ont-bold text-center mb-4">
              {" "}
              {session?.user?.email}
            </p>
          </div>
        )}
        <div className="flex justify-center mt-auto">
          <form action={doLogout} className="w-full flex justify-center">
            <button
              className="bg-black text-white p-2 rounded-lg w-1/2 font-extrabold"
              type="submit"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
