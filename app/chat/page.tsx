import { ChatInterface } from "@/components/ChatInterface";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return <ChatInterface user={user} />;
}
