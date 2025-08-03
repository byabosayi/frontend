export function getDeviceWidth(device = 'desktop') {
  switch (device) {
    case 'mobile':
      return '375px'
    case 'tablet':
      return '768px'
    case 'desktop':
      return '100%'
    default:
      return '100%'
  }
}

// Get responsive values, with mui breakpoint format. editDevice is for edit mode.
export function getResponsiveValues(values, editDevice = null) {
  // Return undefined if values not present or presented values are not objects or presented values is not string.
  if (!values) return undefined

  if (typeof values !== 'object') return values

  const deviceMap = {
    xs: 'mobile',
    sm: 'tablet',
    md: 'desktop',
  }

  // If in edit mode and editDevice is in deviceMap, return the value for the specified device
  if (editDevice && Object.values(deviceMap).includes(editDevice)) {
    const breakpoint = Object.keys(deviceMap).find(
      (key) => deviceMap[key] === editDevice
    )
    return values[breakpoint] || values[editDevice] || Object.values(values)[0]
  }

  return {
    xs: values.xs ?? values.mobile ?? Object.values(values)[0],
    sm:
      values.sm ??
      values.tablet ??
      values.xs ??
      values.mobile ??
      Object.values(values)[0],
    md:
      values.md ??
      values.desktop ??
      values.sm ??
      values.tablet ??
      values.xs ??
      values.mobile ??
      Object.values(values)[0],
  }
}
