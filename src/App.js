import React from "react";
import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch,
  useParams,
} from "react-router-dom";

const users = [
  { id: 1, name: "Костя" },
  { id: 2, name: "Наталья" },
  { id: 3, name: "Саша" },
  { id: 4, name: "Настя " },
  { id: 5, name: "Софья" },
];

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/users" component={UserLayout} />
          <Route path="/" exact component={MainPage} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

function MainPage() {
  return (
    <div>
      <h1>MainPage</h1>
      <NavLink to={"/users"}>To UsersListPage</NavLink>
    </div>
  );
}

function UserLayout() {
  return (
    <div>
      <Switch>
        <Route path={"/users/:userId/profile"} component={UserProfilePage} />
        <Route path={"/users/:userId/edit"} component={EditUserPage} />
        <Route path={"/users"} exact component={UsersListPage} />
        <Redirect from="/users/:userId" to={"/users/:userId/profile"} />
      </Switch>
    </div>
  );
}

function UsersListPage() {
  return (
    <div>
      <h1>UsersListPage</h1>
      <NavLink to={"/"}>To MainPage</NavLink>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <NavLink to={`/users/${u.id}/profile`}>
              {u.id}. {u.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserProfilePage() {
  const { userId } = useParams();
  return (
    <div>
      <h1>User Page №{userId}</h1>
      <hr />
      <h2>mame: {users[userId - 1].name}</h2>
      <h2>userId: {userId}</h2>
      <button>
        <NavLink to={"/users"}>Userslistpage</NavLink>
      </button>
      <tr />
      <button>
        <NavLink to={`/users/${userId}/edit`}>EditUserPage</NavLink>
      </button>
    </div>
  );
}

function EditUserPage() {
  const { userId } = useParams();
  return (
    <div>
      <h1>EditUserPage №{userId}</h1>
      <hr />
      <h2>mame: {users[userId - 1].name}</h2>
      <h2>userId: {userId}</h2>
      <button>
        <NavLink to={"/users"}>Userslistpage</NavLink>
      </button>
      <tr />
      <button>
        <NavLink to={`/users/${userId}`}>UserProfilePage</NavLink>
      </button>
      <tr />
      <button>
        <NavLink to={`/users/${users.length <= userId ? 1 : +userId + 1}`}>
          Another user page
        </NavLink>
      </button>
    </div>
  );
}

export default App;
