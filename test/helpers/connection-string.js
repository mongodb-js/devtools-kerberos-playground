function buildGssapiConnectionString(user, hosts, searchParams) {
  const qs = new URLSearchParams({
    authMechanism: 'GSSAPI',
    authSource: '$external',
    ...searchParams
  }).toString()
  return `mongodb://${encodeURIComponent(user)}@${hosts}/test?${qs}`;
}

module.exports = { buildGssapiConnectionString };