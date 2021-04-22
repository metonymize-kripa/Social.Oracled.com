// Import the wrap method
import {wrap} from 'svelte-spa-router/wrap'

// Components
import Home from './routes/Home.svelte'
import Stock from './routes/Stock.svelte'
import NotFound from './routes/NotFound.svelte'

// Export the route definition object
export default {
    // Exact path
    '/': Home,

    // Using named parameters, with last being optional
    '/stock/:symbol/:cmd?': wrap({
        asyncComponent: () => import('./routes/Stock.svelte')
    }),

    // Catch-all, must be last
    '*': NotFound,
}
