import app from './app'
import { PORT } from './config'
import { getClient } from './db/connection'

getClient()
    .then((client) => {
        console.log('Connected successfully to MongoDB')
        app.locals.dbclient = client
        app.listen(PORT, () => {
            console.log(`App listening at http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        console.log('[ERROR] [MongoDB] [Connection]', err)
    })

process.on('SIGINT', () => {
    app.locals.dbclient.close()
    process.exit()
})
