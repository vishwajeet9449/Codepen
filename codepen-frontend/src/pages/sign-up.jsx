import { Link, useNavigate } from "react-router-dom";
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
import { useState } from "react";

export function SignUp() {

  const [signUpDetails, setSignUpdetails] = useState({ email: "", password: "", role: 1, name: "" })
  const navigate = useNavigate();

  function handlesignup(event) {

    // navigate('/app');
    window.open("https://magenta-jelly-263dba.netlify.app/");

  }
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "email": signUpDetails.email,
      "password": signUpDetails.password,
      "role": 1,
      "name": signUpDetails.name
    })
  };

  const signUp = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/auth/register",
      requestOptions
    ).then(response => {
      response.json()
      // console.log(response);
      if (response.status === 201) {
        alert("User Registered Successfully")
        handlesignup(e);
      }
      else if (response.status === 409) {
        alert("User Already Exist Change Email");
      }
      else if (response.status === 422) {
        alert("Enter a valid Email and password of length 6");
      }
      else {
        alert("Something Went Wrong !");
      }
      return response.json()
    }
    )
      .then(data => () => {
        console.log(data)
      });
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
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input variant="standard" label="Name" size="lg"
              onChange={(e) => {
                setSignUpdetails({ ...signUpDetails, name: e.target.value })
              }}
              value={signUpDetails.name}
            />
            <Input variant="standard" type="email" label="Email" size="lg"
              onChange={(e) => {
                setSignUpdetails({ ...signUpDetails, email: e.target.value })
              }}
              value={signUpDetails.email}
            />
            <Input

              variant="standard"
              type="password"
              label="Password"
              size="lg"
              onChange={(e) => {
                setSignUpdetails({ ...signUpDetails, password: e.target.value })
              }}
              value={signUpDetails.password}
            />
            <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth
              onClick={(e) => signUp(e)}
            >
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
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

export default SignUp;
