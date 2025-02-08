module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8082, 
    allowedHosts: 'all', 
    client: {
      webSocketURL: {
        protocol: 'ws', // Change to 'ws' if running without HTTPS
        hostname: 'localhost', // Change 0.0.0.0 to localhost
        port: 8082, // Frontend port
      },
    },
  },
};
