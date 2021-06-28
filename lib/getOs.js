const getOs = () => {
  let os = 'windows'
  if (navigator.appVersion.includes('Mac') || navigator.platform.includes('Mac')) {
    os = 'mac'
  } else if (navigator.appVersion.includes('Linux') || navigator.platform.includes('Linux')) {
    os = 'linux'
  }
  return os
}

export {
  getOs
}
