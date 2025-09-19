export const prerender = true;

export const load = ({ url }) => {
    return {
        isRoot: url.pathname.length <= 1
    }
}
