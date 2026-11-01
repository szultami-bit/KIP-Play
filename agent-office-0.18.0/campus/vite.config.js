import {defineConfig} from 'vite';
export default defineConfig({root:new URL('.',import.meta.url).pathname,base:'/agent-office/campus/',build:{outDir:'../dist/campus',emptyOutDir:true,target:'es2022',chunkSizeWarningLimit:650}});
