import '@styles/global.css';

export const metadata = {
  title: 'Prompt Central',
  description: 'Discover and share prompts',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <div className='main'>
        <div className='gradient' />
      </div>
      <main className='app'>{children}</main>
    </html>
  );
}
