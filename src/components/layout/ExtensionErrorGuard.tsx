'use client';

import { useEffect } from 'react';

/**
 * Suppresses unhandled promise rejections caused by browser extensions
 * (e.g. MetaMask injecting inpage.js) that are unrelated to application code.
 */
export default function ExtensionErrorGuard() {
  useEffect(() => {
    function handleUnhandledRejection(event: PromiseRejectionEvent) {
      const message =
        event.reason instanceof Error
          ? event.reason.message
          : typeof event.reason === 'string'
            ? event.reason
            : '';

      const stack =
        event.reason instanceof Error ? event.reason.stack || '' : '';

      // Suppress errors originating from browser extensions
      const isExtensionError =
        /chrome-extension:\/\/|moz-extension:\/\/|Failed to connect to MetaMask/i.test(
          `${message} ${stack}`
        );

      if (isExtensionError) {
        event.preventDefault();
      }
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
}
