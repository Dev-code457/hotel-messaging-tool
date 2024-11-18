import "./globals.css";
import { Toaster } from "sonner";
import { ReduxProvider } from "./Providers";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en">
      <body className={`antialiased`}>
      <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
        <ReduxProvider>
          <Toaster richColors />
          <NextTopLoader color="#43a047"

          />


          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
