import { Roboto_Flex, Poppins } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const robotoFlex = Roboto_Flex({
  weight: ["variable"],
  subsets: ["latin"],
});

export const metadata = {
  title: "The VA BAR",
  description: "The VA BAR reaches more aspiring VA or anyone who wants to learn more on how to start their freelancing career or anyone can share their ideas and experience about being a Virtual Assistant.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${robotoFlex.className} antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
