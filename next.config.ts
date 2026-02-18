import type { NextConfig } from 'next';
import { legacyRedirects } from './src/lib/siteRoutes';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  async redirects() {
    return legacyRedirects.map((redirect) => ({
      source: redirect.source,
      destination: redirect.destination,
      permanent: redirect.permanent,
    }));
  },
};

export default nextConfig;
