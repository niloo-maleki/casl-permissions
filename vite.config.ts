import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { sentryVitePlugin } from "@sentry/vite-plugin";
import url from 'url';
import svgr from "@svgr/rollup";

// Getting the current directory path
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Exporting the configuration object
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'; // Checking if the build is for production

  return {
    plugins: [
      react(), // Adding the React plugin
      svgr(),
      sentryVitePlugin({
        org: "shatel", // Sentry organization name
        project: "casl-permissions", // Sentry project name
        authToken: process.env.SENTRY_AUTH_TOKEN, // Using an authentication token from environment variables
      }),
    ],
    build: {
      sourcemap: !isProduction, // Generate source maps for development, disable for production
      emptyOutDir: true, // Clear the output directory before building
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[extname]', // Naming for asset files
          chunkFileNames: 'js/chunks/[name].[hash].js', // Naming for chunk files
          entryFileNames: '[name].js', // Naming for entry files
          manualChunks: {
            vendor: ['react', 'react-dom'], // Grouping React and ReactDOM into a separate chunk called "vendor"
          },
        },
      },
      minify: isProduction ? 'terser' : false, // Enable minification only for production builds
      terserOptions: {
        compress: {
          drop_console: isProduction, // Remove console.log statements in production
        },
        format: {
          comments: false, // Remove comments from the output code
        },
        mangle: true, // Shorten variable names for smaller file size
      },
    },
    resolve: {
      alias: { // Setting up aliases for cleaner imports
        '@src': resolve(__dirname, 'src'), // Alias for the "src" directory
        '@assets': resolve(__dirname, 'src/assets'), // Alias for the "assets" folder in "src"
        '@components': resolve(__dirname, 'src/components'), // Alias for the "components" folder in "src"
        '@icons': resolve(__dirname, 'src/assets/svg'), // Alias for the "svg" folder inside assets
      },
    },
    // Uncomment to set up a development server proxy //
    // server: { 
    //   proxy: {
    //     '/api': { // Proxy requests to "/api"
    //       target: 'https://localhost:44310', // Forward these requests to this target URL
    //       changeOrigin: true, // Change the origin of the request to the target's origin
    //       secure: false, // Disable SSL verification for the target
    //     }
    //   }
    // },
  };
});
