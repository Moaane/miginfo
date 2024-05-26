const bcrypt = require("bcrypt");

export default async function VerifyPassword(password, hashedPassword) {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  console.log(isPasswordValid);
  return isPasswordValid;
}
