import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { SimpleFooter } from "@/widgets/layout";
// import App from '../codePen/App'

export function SignIn() {

  const [loginDetails, setLogindetails] = useState({ email: "", password: "" })
  const navigate = useNavigate();

  function handleLogin(event) {

    // navigate('/app');
    window.open("https://magenta-jelly-263dba.netlify.app/");
  }
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "email": loginDetails.email,
      "password": loginDetails.password
    })
  };

  const login = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/auth/login",
      requestOptions
    ).then(response => {
      response.json()
      // console.log(response);
      if (response.status !== 200) {
        alert("Wrong Credentials")
      }
      else if (response.status === 200) {
        alert("Login Successful");
        handleLogin(e);
      }
      else {
        alert("Something Went Wrong !");
      }
      return response.json()
    }
    ).then(data => console.log(data));
  }

  return (
    <>
      <img
        src="/img/background-2.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input variant="standard" type="email" label="Email" size="lg"
              onChange={(e) => {
                setLogindetails({ ...loginDetails, email: e.target.value })
              }}
              value={loginDetails.email}
            />
            <Input
              variant="standard"
              type="password"
              label="Password"
              size="lg"
              onChange={(e) => {
                setLogindetails({ ...loginDetails, password: e.target.value })
              }}
              value={loginDetails.password}
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">

            <Button variant="gradient" fullWidth
              onClick={(e) => login(e)}
            >
              Login
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <SimpleFooter />
      </div>
    </>
  );
}

export default SignIn;
