import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'ru-msk-dr3-1.store.cloud.mts.ru', // 👈 твой CDN для изображений

        ],
    },

};

export default nextConfig;
