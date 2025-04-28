import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // make sure all system JSON data gets included in the build
  outputFileTracingIncludes: {
    '/': ['./src/systems/**/*.json']
  }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
