module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8082, // or the port you're using
    allowedHosts: 'all', // Allow connections from any host (like Ngrok URLs)
    client: {
      webSocketURL: {
        protocol: 'wss', // Use wss when served over HTTPS
        hostname: '0.0.0.0',
        port: 8082, // Frontend port
      },
    },
  },
};
