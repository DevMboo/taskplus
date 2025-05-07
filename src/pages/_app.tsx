import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css'; // ou seu CSS global
import { Main } from '@/components/common/Main';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
        <Main>
            <Component {...pageProps} />
        </Main>
    </AuthProvider>
  );
}
