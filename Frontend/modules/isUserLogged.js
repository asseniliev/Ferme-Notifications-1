import { useSelector } from "react-redux";

export function getLoggedUser() {
  const loggedUser = useSelector((data) => {
    if (data.user) return data.user.value;
    else return null;
  });
  return loggedUser;
}