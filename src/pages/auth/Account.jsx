import useAuth from "../../components/AuthProvider.jsx";

const AccountPage = () => {
  const auth = useAuth();
  return (
    <>
      <div>Hi</div>
      <button
        onClick={() => auth.signout()}
      >
        Debug Signout
      </button>
    </>
  );
};
export default AccountPage;
