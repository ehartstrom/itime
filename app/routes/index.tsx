import { Button, Container } from "@mantine/core";
import { Link } from "@remix-run/react";


import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    
              <Container>
                {user ? (
                  <Button component={Link}
                    to="/notes"
                    //className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                  >
                    View Notes for {user.email}
                  </Button>
                ) : (
                  <div >
                    <Button
                      component={Link}
                      to="/join"
                      //className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                    >
                      Sign up
                    </Button>
                    <Button
                      component={Link}
                      to="/login"
                      //className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-600  "
                    >
                      Log In
                    </Button>
                  </div>
                )}
              </Container>
  );
}
