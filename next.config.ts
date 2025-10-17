import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://192.168.0.110:3000',
    'http://192.168.107.215:3000',
  ],
};

export default nextConfig;
