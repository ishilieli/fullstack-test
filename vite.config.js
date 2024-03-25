import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'views/index.html'),
                authorization: resolve(__dirname, 'views/auth/auth.html'),
                article: resolve(__dirname, 'views/article/article.html'),
            },
        },
    },
});
