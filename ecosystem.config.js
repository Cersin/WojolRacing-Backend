module.exports = {
    apps: [
        {
            name: 'Wojol Racing',
            exec_mode: 'cluster',
            instances: '3',
            script: './.output/server/index.mjs'
        }
    ]
}