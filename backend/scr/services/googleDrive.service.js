const { google } = require('googleapis')
const stream = require('stream')

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_DRIVE_CLIENT_ID,
  process.env.GOOGLE_DRIVE_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
)

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN
})

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
})

function escapeDriveName(name) {
  return String(name).replace(/'/g, "\\'")
}

async function findOrCreateFolder(folderName, parentFolderId) {
  const safeFolderName = escapeDriveName(folderName)

  const search = await drive.files.list({
    q: `name='${safeFolderName}' and mimeType='application/vnd.google-apps.folder' and '${parentFolderId}' in parents and trashed=false`,
    fields: 'files(id, name)',
    spaces: 'drive'
  })

  if (search.data.files.length > 0) {
    return search.data.files[0].id
  }

  const folder = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId]
    },
    fields: 'id'
  })

  return folder.data.id
}

async function uploadImageToDrive(file, data) {
  const productFolderId = await findOrCreateFolder(
    data.productName,
    process.env.GOOGLE_DRIVE_FOLDER_ID
  )

  const colorFolderId = await findOrCreateFolder(
    data.color,
    productFolderId
  )

  const bufferStream = new stream.PassThrough()
  bufferStream.end(file.buffer)

  const extension = file.originalname.split('.').pop()
  const fileName = `${data.productName}-${data.color}-${data.size}-${data.index + 1}.${extension}`

  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [colorFolderId]
    },
    media: {
      mimeType: file.mimetype,
      body: bufferStream
    },
    fields: 'id, name'
  })

  await drive.permissions.create({
    fileId: response.data.id,
    requestBody: {
      role: 'reader',
      type: 'anyone'
    }
  })

  return {
    url: `https://drive.google.com/uc?id=${response.data.id}`,
    name: response.data.name
  }
}

module.exports = {
  uploadImageToDrive
}