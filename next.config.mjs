/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    // Add WebAssembly support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // Obfuscate production build
    if (!isServer && process.env.NODE_ENV === 'production') {
      config.optimization.minimize = true;
      config.optimization.minimizer.push(
        new (require('javascript-obfuscator')).WebpackPlugin({
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 1,
          numbersToExpressions: true,
          simplify: true,
          stringArrayShuffle: true,
          splitStrings: true,
          stringArrayThreshold: 1,
          transformObjectKeys: true,
          unicodeEscapeSequence: false,
        })
      );
    }

    return config;
  },
};

export default nextConfig;