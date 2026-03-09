const shell = document.querySelector<HTMLElement>('[data-module-shell]')
const statusNodes = document.querySelectorAll<HTMLElement>('[data-last-updated]')
const links = document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')

const formatStamp = (): string => {
  const now = new Date()
  return now.toLocaleString([], {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

statusNodes.forEach((node) => {
  node.textContent = formatStamp()
})

links.forEach((link) => {
  link.addEventListener('click', () => {
    if (!shell) {
      return
    }

    shell.classList.add('module-shell-loading')
    window.setTimeout(() => {
      shell.classList.remove('module-shell-loading')
    }, 900)
  })
})
