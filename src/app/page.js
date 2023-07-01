import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar";
import { SideBar } from "@/components/Sidebar";
import Chat from "@/components/chat/chat";
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <Navbar session={session.user}></Navbar>
      <SideBar session={session.user}></SideBar>
    </main>
  );
}
