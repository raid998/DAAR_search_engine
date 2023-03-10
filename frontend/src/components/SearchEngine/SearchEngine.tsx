import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";

const SearchEngine = () => {
  return (
    <Box>
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h4"
          align="center"
          sx={{ maxWith: "50%", marginTop: 12, marginBottom: 10 }}
        >
          Moteur de recherche
        </Typography>

        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            type="search"
            id="search"
            label="Recherche ..."
            fullWidth
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
          >
            <SearchIcon sx={{ display: { xs: "flex", md: "flex" }, ml: 1 }} />
            Rechercher
          </Button>
        </Container>
      </Container>
    </Box>
  );
};

export default SearchEngine;
