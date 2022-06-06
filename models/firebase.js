const admin = require('firebase-admin')
const { ENV } = require('../config')

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: ENV.FIREBASE_PROJECT_ID,
    private_key: ENV.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: ENV.FIREBASE_CLIENT_EMAIL
  }),
  storageBucket: ENV.FIREBASE_STORAGE_BUCKET
})

const Bucket = admin.storage().bucket()

module.exports = Bucket
