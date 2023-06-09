import NavBar from '../components/NavBar';
import './globals.css';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full min-h-screen bg-gray-50" lang="en">
      <body className="h-full">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
