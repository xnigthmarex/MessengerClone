
import { getServerSession } from 'next-auth'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import Navbar from '@/components/Navbar'
import  Sidebar  from '@/components/Sidebar';
export default async function Home() {
  const session = await getServerSession(authOptions);
 
  return (
    <main>
    <Navbar session={session.user} ></Navbar>
    <Sidebar for_indox_session = {session.user}></Sidebar>
    </main>
  )
}
