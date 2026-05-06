export function getDriveFileId(url) {
  if (!url) {
    return null
  }

  const text = String(url)
  const patterns = [
    /id=([^&]+)/,
    /\/d\/([^/]+)/,
    /file\/d\/([^/]+)/,
    /thumbnail\?id=([^&]+)/
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)

    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

export function getImageUrl(url, size = 'w700') {
  if (!url) {
    return null
  }

  const fileId = getDriveFileId(url)

  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`
  }

  if (url.startsWith('/')) {
    return `http://localhost:3000${url}`
  }

  return url
}

export function getCategoryImage(category) {
  return getImageUrl(
    category?.image_url || category?.imageUrl || category?.photo_url || category?.photoUrl
  )
}
