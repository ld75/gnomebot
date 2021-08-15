module.exports = {
    app:[{
        name : "app",
        script: "./src/app.js"
    }],
    script: "serve",
    env: {
        PM2_SERVE_PATH: './src',
        PM2_SERVE_PORT: 8080
    }
}

