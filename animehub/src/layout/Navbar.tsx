import { AppBar, Toolbar, IconButton, Typography, Container } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
  const { toggleTheme, darkMode } = useThemeContext();

  return (
    <AppBar position="sticky" sx={{ width: "100vw" }}>
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
  );
};

export default Navbar;
