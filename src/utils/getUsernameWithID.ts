export default function getUsernameWithID(username: string, id: string, max_length = 10) {
  if (username.length > max_length) {
    username = username.slice(0, max_length)
  }
  const id_part = '#' + id.slice(0, 4)
  return {usernameId: `${username}${id_part}`, username_part: username, id_part: id_part};
}
