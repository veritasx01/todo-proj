import { userService } from "../services/user.service.js";
import { setCurrentUser } from "../store/actions/user.action.js";

const { useParams } = ReactRouterDOM;
const { useState, useEffect } = React;
const { useSelector } = ReactRedux;

export function UserDetails() {
  const [localUser, setlocalUser] = useState(null);
  const [locked, setLocked] = useState(true);
  const loggedUser = useSelector((state) => state.userModule.user);
  const params = useParams();

  useEffect(() => {
    userService.getById(params.userId).then(setlocalUser);
  }, []);

  useEffect(() => {
    console.log("logged user: ", loggedUser);
    console.log("current user: ", localUser);
    setLocked(localUser == loggedUser);
  }, [loggedUser]);

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }
    setlocalUser((prevUser) => ({ ...prevUser, [field]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentUser(localUser);
    userService.saveUser(localUser);

  };

  if (!localUser) {
    return <h1>User doesn't exist</h1>;
  }

  return (
    <article>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={locked}>
          <label>Name: </label>
          <input
            type="text"
            name="fullname"
            value={localUser.fullname}
            onChange={handleChange}
          ></input>
          <label>Color: </label>
          <input
            type="color"
            name="color"
            value={localUser.prefs.color}
            onChange={handleChange}
          ></input>
          <label>Background color: </label>
          <input
            type="color"
            name="bgColor"
            value={localUser.prefs.bgColor}
            onChange={handleChange}
          ></input>
          <button>Save</button>
        </fieldset>
      </form>
    </article>
  );
}
