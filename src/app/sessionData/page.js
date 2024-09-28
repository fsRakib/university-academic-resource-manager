"use client";

import { useSession } from "next-auth/react";

function MyPage() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Not logged in</p>;
  }

  console.log("Session Data:", session);

  return (
    <div className="text-2xl font-bold tracking-wider space-y-5">
      <h1>Welcome, {session.user.name}</h1>
      <h1>ID: {session.user.id}</h1>
      <p>Email: {session.user.email}</p>
      <p>Phone: {session.user.phone}</p>
      <p>Address: {session.user.address}</p>
      <p>University: {session.user.university}</p>
      <p>Department: {session.user.department}</p>
      <p>Session: {session.user.session}</p>
      <p>Gender: {session.user.gender}</p>
    </div>
  );
}

export default MyPage;
