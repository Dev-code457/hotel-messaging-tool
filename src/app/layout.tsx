import "./globals.css";
import { Toaster } from "sonner";
import { ReduxProvider } from "./Providers";

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
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
