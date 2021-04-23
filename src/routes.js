// Components
import Home from './routes/Home.svelte'
import Stock from './routes/Stock.svelte'
import User from './routes/Users.svelte'
import NotFound from './routes/NotFound.svelte'

// Export the route definition object
export default {
    // Exact path
    '/': Home,

    // Using named parameters, with last being optional
    '/stock/:symbol/:cmd?': Stock,
    
    '/user/:user': User,

    // Catch-all, must be last
    '*': NotFound,
}
