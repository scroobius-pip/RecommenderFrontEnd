import { db } from '../firebaseConfigured'

export default (uid, refreshToken, accessToken, platformName) => {
  db.collection('users').doc(uid).collection('platforms').add({
    platform_name: platformName,
    platform_token: accessToken,
    refresh_token: refreshToken
  }).then(() => {
    console.log('done')
  }).catch(error => {
    console.log(error)
  })
}
