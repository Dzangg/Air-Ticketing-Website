import { useRouteError } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const navigate = useNavigate();

  return (
    <div
      id="error-page"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={"/"}> Strona główna</Link>
    </div>
  );
}
