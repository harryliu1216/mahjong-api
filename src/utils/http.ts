export function getClientIP(req) {
  return (
    getValidIp(req.headers['x-forwarded-for']) ||
    getValidIp(req.connection?.remoteAddress) ||
    getValidIp(req.socket?.remoteAddress) ||
    getValidIp(req.connection?.socket?.remoteAddress) ||
    getValidIp(req.ip)
  );
}

const getValidIp = (ip) => {
  if (ip && !/^1(27)|(0)|(92)|(72)\./.test(ip) && ip !== '::1' && ip != '::ffff:127.0.0.1') {
    return ip;
  } else {
    return null;
  }
};
