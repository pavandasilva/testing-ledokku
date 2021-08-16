// import * as functions from 'firebase-functions'
import http from 'http'
import app from './rest/app'

// firebase server
// exports.api = functions.https.onRequest(app)

// http server
const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || 3000, ()=> {
    console.log("API IS RUNNING ON PORT 3000")
})