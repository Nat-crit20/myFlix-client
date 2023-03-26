export const ProfileView = ({ user, deregister }) => {
  return (
    <>
      <h1>{user.Username}</h1>
      <button onClick={deregister}>Deregister</button>
    </>
  );
};
