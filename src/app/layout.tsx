import "./globals.css";
import Head from "./head";
import SideBar from "../../components/SideBar";
import Login from "../../components/Login";
import { SessionProvider } from "../../components/SessionProvider";
import { Session, getServerSession } from "next-auth";
import { GET } from "./api/auth/[...nextauth]/route";
import ClientProvider from "../../components/ClientProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: Session | null = await getServerSession(GET);

  return (
    <html lang="en">
      <Head></Head>
      <body>
        <SessionProvider>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <SideBar />
              </div>
              <ClientProvider />
              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
