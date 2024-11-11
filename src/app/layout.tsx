import "./globals.css";
import { Toaster } from "sonner";
import { ReduxProvider } from "./Providers";
import Profile from "@/components/Profile";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (

    <html lang="en">
      <body className={`antialiased`}>

        <ReduxProvider>
          <Toaster richColors />
          <NextTopLoader color="#43a047"
          
            />

<<<<<<< HEAD
=======
          <Profile onSelectForm={undefined} />
>>>>>>> 3826dec (Initial Commit)
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
