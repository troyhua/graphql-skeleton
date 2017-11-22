const HEADER_REGEX = /bearer token-(.*)$/;

/**
 * This is an extremely simple token. In real applications make
 * sure to use a better one, such as JWT (https://jwt.io/).
 */
module.exports.authenticate = async (req, Users) => {
  let {headers: {authorization}} = req;
  console.log(req.headers)
  console.log(authorization)
  const email = authorization && HEADER_REGEX.exec(authorization)[1];
  return email && await Users.findOne({email});
}
