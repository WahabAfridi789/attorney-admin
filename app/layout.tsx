import { Karla } from 'next/font/google'
import './globals.css'
import { getServerSession } from "next-auth";
import SessionProvider from "@/lib/SessionProvider";
import { ThemeProvider } from '@/components/theme-provider';
import { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
const karla = Karla({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets: ['latin'],
    variable: "--font-karla"
})
export const metadata: Metadata = {
    title: "Dz admin dashboard",
    description: "NextJs admin dashboard created by Sijin Raj"
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession();

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={karla.className}>
                <SessionProvider session={session}>
                    <ThemeProvider
                        themes={['dark', 'custom', 'light']}
                        attribute="class"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className='min-h-screen flex'>
                            <main className='w-full'>
                                {children}
                            </main>
                        </div>
                        <Toaster />
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    )
}
