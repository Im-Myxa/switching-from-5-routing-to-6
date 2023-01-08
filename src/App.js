import React from "react";
import {
  Navigate,
  NavLink,
  Outlet,
  useParams,
  useRoutes,
} from "react-router-dom";

const users = [
  { id: 1, name: "Костя" },
  { id: 2, name: "Наталья" },
  { id: 3, name: "Саша" },
  { id: 4, name: "Настя " },
  { id: 5, name: "Софья" },
];

function App() {
  const elements = useRoutes([
    {
      path: "/users",
      element: <UserLayout />,
      children: [
        { path: "", element: <UsersListPage /> },
        {
          path: ":userId",
          element: <Outlet />,
          children: [
            { path: "profile", element: <UserProfilePage /> },
            { path: "edit", element: <EditUserPage /> },
            { path: "*", element: <Navigate to={"profile"} /> },
            { path: "", element: <Navigate to={"profile"} /> },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);
  return <div className="App">{elements}</div>;
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
      <Outlet />
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
      <h1>User Page</h1>
      <hr />
      {users[userId - 1] ? (
        <>
          <h2>mame: {users[userId - 1].name}</h2>
          <h2>userId: {userId}</h2>
          <button>
            <NavLink to={"/users"}>Userslistpage</NavLink>
          </button>

          <button>
            <NavLink to={`/users/${userId}/edit`}>EditUserPage</NavLink>
          </button>
        </>
      ) : (
        <>
          <h2>Пользователя {userId} не существует </h2>
          <tr />
          <button>
            <NavLink to={"/users"}>Userslistpage</NavLink>
          </button>
        </>
      )}
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
        <NavLink to={"/users/" + userId + "/profile"}>UserProfilePage</NavLink>
      </button>
      <tr />
      <button>
        <NavLink
          to={
            "/users/" + (users.length <= userId ? 1 : +userId + 1) + "/profile"
          }
        >
          Another user page
        </NavLink>
      </button>
    </div>
  );
}

export default App;
