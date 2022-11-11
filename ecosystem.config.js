module.exports = {
    apps: [
        {
            name: 'Wojol Racing',
            exec_mode: 'cluster',
            instances: '4',
            script: './.output/server/index.mjs'
        }
    ]
}