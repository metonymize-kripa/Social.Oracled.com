// Components
import Home from './routes/Home.svelte'
import Stock from './routes/Stock.svelte'
import NotFound from './routes/NotFound.svelte'

// Export the route definition object
export default {
    // Exact path
    '/': Home,

    // Using named parameters, with last being optional
    '/stock/:symbol/:cmd?': Stock,

    // Catch-all, must be last
    '*': NotFound,
}
