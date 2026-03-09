export function appFilters(eleventyConfig) {
  eleventyConfig.addFilter('relative', (page) => {
    const segments = (page.url || '').replace(/^\//, '').split('/')
    if (segments.length <= 1) {
      return '.'
    }

    return '../'.repeat(segments.length - 1).slice(0, -1)
  })

  eleventyConfig.addFilter('parse_json', (value) => JSON.parse(value))
}
