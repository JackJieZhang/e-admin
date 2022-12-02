import nprogress from 'nprogress'

export function showFullLoading() {
  nprogress.configure({ showSpinner: false }).start()
}

export function hideFullLoading() {
  nprogress.done()
}
