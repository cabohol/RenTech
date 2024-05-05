import { defineConfig } from 'vite';
import { resolve } from 'path'; 

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {

        main: resolve(__dirname, 'src/index.html'),
        login: resolve(__dirname, 'src/login.html'),
        signup: resolve(__dirname, 'src/signup.html'),
        home: resolve(__dirname, 'src/home.html'), 
        viewmore: resolve(__dirname, 'src/viewmore.html'),
        viewmore1: resolve(__dirname, 'src/viewmore1.html'),
        add: resolve(__dirname, 'src/add.html'),
        overview: resolve(__dirname, 'src/overview.html'),
        overview1: resolve(__dirname, 'src/overview1.html'),
        profile: resolve(__dirname, 'src/profile.html'),
        feed: resolve(__dirname, 'src/feed.html'),
        aboutme: resolve(__dirname, 'src/aboutme.html'),
        
      },
    },
  },
});

