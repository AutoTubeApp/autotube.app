const getOs = () => {
  let os = 'windows'
  if (navigator.appVersion.includes('Mac')) {
    os = 'mac'
  } else if (navigator.appVersion.includes('Linux')) {
    os = 'linux'
  }
  return os
}

export {
  getOs
}
