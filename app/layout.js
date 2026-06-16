import './globals.css';

export const metadata = {
  title: 'Bobby Media Photo Studio | Premium Photography & Event Booking',
  description:
    'Professional wedding photography, birthday events, outdoor photoshoots and cinematic storytelling.',

  icons: {
    icon: '/images/logo/logo.jpeg',
    shortcut: '/images/logo/logo.jpeg',
    apple: '/images/logo/logo.jpeg',
  },

  openGraph: {
    title: 'Bobby Media Photo Studio',
    description: 'Premium photography and event booking website.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}