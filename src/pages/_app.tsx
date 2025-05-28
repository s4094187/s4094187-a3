import "@/styles/globals.css";
import type { AppProps } from "next/app";
import * as React from "react";
import { ChakraProvider } from '@chakra-ui/react';
import { TotalTrackerProvider } from '../components/totaltracker';

export default function App({ Component, pageProps }: AppProps) {
  return(  
    <ChakraProvider>  
      <TotalTrackerProvider>
        <Component {...pageProps} />;
      </TotalTrackerProvider>
    </ChakraProvider>
  )
}
