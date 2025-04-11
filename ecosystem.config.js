module.exports = {
  apps: [
    {
      name: 'nest-backend',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: ['dist'], // ✅ dist 디렉토리 감시
      watch_delay: 1000,
      watch_options: {
        followSymlinks: false,
        usePolling: true,
        interval: 1000,
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
