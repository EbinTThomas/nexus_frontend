/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/projects/:path*",
                missing: [
                    {
                        type: "cookie",
                        key: "access",
                    },
                ],
                permanent: false,
                destination: "/auth/login",
            },
        ];
    },
};

export default nextConfig;
