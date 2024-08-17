import { Home, Profile, SignIn, SignUp } from "@/pages";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
// import Codepen from "./codePen/Component/Codepen";
// import Window from "./codepen_window/window";

export const routes = [
  {
    icon: HomeIcon,
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    icon: UserCircleIcon,
    name: "profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    icon: ArrowRightOnRectangleIcon,
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    icon: UserPlusIcon,
    name: "Sign Up",
    path: "/sign-up",
    element: <SignUp />,
  },
  // {
  //   icon: ArrowRightOnRectangleIcon,
  //   name: "App",
  //   path: "/app",
  //   element: <Window />,
  // },
  // {
  //   icon: DocumentTextIcon,
  //   name: "Docs",
  //   href: "https://blog.codepen.io/documentation/",
  //   target: "_blank",
  //   element: "",
  // },

];

export default routes;
