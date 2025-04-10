module.exports = {
  apps: [
    {
      name: 'nest-backend',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false, // production에서는 false 권장
      max_memory_restart: '5G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
