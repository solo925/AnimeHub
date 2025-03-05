import { Container } from "@mui/material";
import { ComponentType } from "react";

const withLayout = <P extends object>(Component: ComponentType<P>) => (props: P) => (
  <>
    {/* <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">AnimeHub</Typography>
      </Toolbar>
    </AppBar> */}
    <Container sx={{ mt: 4 }}>
      <Component {...props} />
    </Container>
  </>
);

export default withLayout;
