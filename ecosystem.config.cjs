module.exports = {
    apps: [
        {
            name: "lawerai-api",
            script: "dist/src/server.js",
            interpreter: "node",
            instances: 1,
            exec_mode: "fork",
            autorestart: true,
            max_memory_restart: "500M",
            env: {
                NODE_ENV: "production",
            },
        },
        {
            name: "lawerai-queue",
            script: "dist/src/queue.js",
            interpreter: "node",
            instances: 1,
            exec_mode: "fork",
            autorestart: true,
            max_memory_restart: "500M",
            env: {
                NODE_ENV: "production",
            },
        },
        {
            name: "lawerai-schedule",
            script: "dist/src/schedule.js",
            interpreter: "node",
            instances: 1,
            exec_mode: "fork",
            autorestart: true,
            max_memory_restart: "500M",
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
