import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains:['cdn.sanity.io']
  },

  eslint: {
    ignoreDuringBuilds: true,   // 👈 Ajoute cette ligne
  },


  
};

export default nextConfig;