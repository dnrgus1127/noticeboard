import { domain_port } from "../Setting.js";

function getUser() {
  const result = fetch(`${domain_port}/fetch/user`);
  return result;
}

export { getUser };
