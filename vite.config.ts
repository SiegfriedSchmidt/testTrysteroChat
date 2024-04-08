import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8000,
        host: '0.0.0.0',
        https: {
            cert: fs.readFileSync('./certs/tls.crt'),
            key: fs.readFileSync('./certs/tls.key')
        },
    },
    plugins: [react()],
})
