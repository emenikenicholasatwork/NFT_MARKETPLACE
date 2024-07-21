/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['gateway.pinata.cloud'],
    },
    env: {
        PINATA_API_KEY: process.env.API_Key,
        PINATA_SECRET_KEY: process.env.API_Secret,
        PINATA_JWT: process.env.JWT,
        INFURA_API_KEY: process.env.INFURA_api_key,
        CONTRACT_ADDRESS: process.env.DEPLOYED_contract_address
    },
};

export default nextConfig;