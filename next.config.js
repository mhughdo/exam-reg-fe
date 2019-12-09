const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

module.exports = withCSS(
    withSass({
        webpack(config, {isServer}) {
            if (isServer) {
                const antStyles = /antd\/.*?\/style\/css.*?/
                const origExternals = [...config.externals]
                config.externals = [
                    (context, request, callback) => {
                        if (request.match(antStyles)) return callback()
                        if (typeof origExternals[0] === 'function') {
                            origExternals[0](context, request, callback)
                        } else {
                            callback()
                        }
                    },
                    ...(typeof origExternals[0] === 'function' ? [] : origExternals),
                ]
                config.module.rules.unshift({
                    test: antStyles,
                    use: 'null-loader',
                })
            }
            config.module.rules.push({
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                    },
                },
            })
            return config
        },
        poweredByHeader: false,
    })
)
