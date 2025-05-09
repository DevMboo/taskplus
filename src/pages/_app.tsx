import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';
import { Main } from '@/components/common/Main';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { AlertProvider } from '@/contexts/AlertContext';
import { AlertContainer } from '@/components/common/AlertContainer';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LoadingProvider>
        <AlertProvider>
          <Main>
            <Component {...pageProps} />
            <AlertContainer />
          </Main>
        </AlertProvider>
      </LoadingProvider>
    </AuthProvider>
  );
}
