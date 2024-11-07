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
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false} />
          <Profile />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
