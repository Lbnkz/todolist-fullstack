module.exports = {
    apps: [
      {
        name: "minha-api",
        script: "server.js", // Arquivo principal do seu projeto
        instances: 1, // Número de instâncias (0 = modo cluster, ajusta automaticamente)
        exec_mode: "fork", // Pode ser "cluster" ou "fork"
        watch: true, // Reinicia automaticamente se houver mudanças no código
        env: {
          NODE_ENV: "development",
        },
        env_production: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  