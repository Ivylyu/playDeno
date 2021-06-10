import { Application } from 'https://deno.land/x/oak/mod.ts'
import router from './routes.ts'
const port = 5000
<<<<<<< HEAD
const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())
console.log(`Server running on port: ${port}`)
=======

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Server running on port: ${port}`)

>>>>>>> 4bee9aad6276db97e22534980bb31fa5c936484d
await app.listen({port})