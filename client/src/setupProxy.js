const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/payments',
    createProxyMiddleware({
      target: 'https://services.paytrail.com/payments',
      changeOrigin: true,
      logLevel: "debug"
    })
  );
};