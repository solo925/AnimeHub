import { AppBar, Toolbar, IconButton, Typography, Container, Box } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
  const { toggleTheme, darkMode } = useThemeContext();

  return (
    <>
      <AppBar position="fixed" sx={{ width: "100vw" }}>
        <Container maxWidth="xl" disableGutters>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              AnimeHub
            </Typography>
            <IconButton onClick={toggleTheme} color="inherit">
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Spacer to prevent content overlap */}
      <Box sx={{ marginBottom: "64px" }} />
    </>
  );
};

export default Navbar;
