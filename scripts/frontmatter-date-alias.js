/* global hexo */

'use strict'

const moment = require('moment-timezone')

const DATE_FORMATS = [
  'YYYY-MM-DD HH:mm:ss',
  'YYYY-MM-DD HH:mm',
  'YYYY-MM-DD'
]

function getFrontMatterBlock(raw) {
  const match = raw && raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  return match ? match[1] : ''
}

function getFrontMatterValue(raw, key) {
  const frontMatter = getFrontMatterBlock(raw)
  if (!frontMatter) return null

  const pattern = new RegExp(`^${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\s*(.+)$`, 'm')
  const match = frontMatter.match(pattern)

  if (!match) return null

  return match[1].trim().replace(/^['"]|['"]$/g, '')
}

function parseWithTimezone(value, timezone) {
  if (!value) return null

  const parsed = moment.tz(value, DATE_FORMATS, true, timezone)
  return parsed.isValid() ? parsed.toDate() : null
}

hexo.extend.filter.register('before_generate', () => {
  const Post = hexo.model('Post')
  const timezone = hexo.config.timezone || 'Asia/Shanghai'

  if (!Post) return

  const updates = []

  Post.find({}).forEach(post => {
    const patch = {}
    const createdAt = parseWithTimezone(getFrontMatterValue(post.raw, 'date created'), timezone)
    const modifiedAt = parseWithTimezone(getFrontMatterValue(post.raw, 'modify'), timezone)

    // 兼容自定义 Front Matter 字段名，统一映射到主题使用的标准字段。
    if (createdAt) {
      patch.date = createdAt
    }

    if (modifiedAt) {
      patch.updated = modifiedAt
    }

    if (Object.keys(patch).length > 0) {
      updates.push(post.update(patch))
    }
  })

  return Promise.all(updates)
})
