const ident = (x) => x

function interpolate (str, params, prefix = '', converter = ident, fallback = '') {
  if (prefix.length > 0) {
    prefix = `${prefix}\\.`
  }
  for (const key in params) {
    str = str.replace(
      new RegExp(`{${prefix}${key}}`),
      converter(params[key] || fallback)
    )
    str = str.replace(
      new RegExp(`{${prefix}${key}\\.raw}`),
      params[key] || fallback
    )
  }
  return str
}

function makeTimeout (ms: number) {
  return function timeout () {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

const escapeJsString = (str) => {
  return str.replace(/\\/g, '\\\\').replace(/'/g, '\\\'')
}

export {
  escapeJsString, interpolate, makeTimeout
}
