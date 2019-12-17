import Router from 'next/router'

export default (context, target) => {
    if (context.res) {
        context.res.writeHead(302, {Location: target})
        context.res.end()
    } else {
        // Router.beforePopState(({url, as, options}) => {
        //     window.location.href = as
        //     return false
        // })
        Router.replace(target)
    }
}
