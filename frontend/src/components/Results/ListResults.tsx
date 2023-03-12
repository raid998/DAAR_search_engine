import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { theme } from "../../utils/theme";

const ListResults = () => {
  return (
    <Box>
      <Typography
        component="h1"
        variant="h5"
        align="center"
        sx={{ maxWith: "50%", marginTop: 8, marginBottom: 4 }}
      >
        Résultats
      </Typography>
      <Card
        sx={{
          [theme.breakpoints.down("sm")]: {
            display: "flex",
            maxHeight: "650px",
            maxWidth: "80vw",
            flexDirection: "column",
            alignItems: "center",
            justify: "center",
          },
          [theme.breakpoints.up("sm")]: {
            display: "flex",
            maxHeight: "300px",
            maxWidth: "80vw",
          },
          marginBottom: 1,
          margin: 5,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 180, margin: 2 }}
          image="https://ae01.alicdn.com/kf/S04dfdd2b70e84c63b70b0b7147b801efO/William-Shakespeare-Romeo-Juliet-Act-1-sc-ne-5.jpg_Q90.jpg_.webp"
          alt="Live from space album cover"
        />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ maxHeight: "60%" }}>
            <Typography
              component="div"
              variant="h6"
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                maxWith: "50%",
              }}
            >
              THE TRAGEDY OF ROMEO AND JULIET
            </Typography>
            <Typography
              variant="caption"
              component="div"
              maxHeight="15vh"
              maxWidth="30vw"
              overflow="hidden"
              whiteSpace="initial"
              textOverflow="ellipsis"
              sx={{ overflowWrap: "break-word" }}
            >
              by William Shakespeare
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                backgroundColor: "white",
                flexBasis: "20%",
                alignSelf: "flex-end",
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                minHeight: "10vh",
                overflowWrap: "break-word",
                lineHeight: "0",
              }}
              flexDirection={"column"}
              justifyContent={"flex-start"}
              mt={1}
            >
              <p>Texte</p>
            </Box>
          </CardContent>
        </Box>
      </Card>

      <Typography
        component="h1"
        variant="h5"
        align="center"
        sx={{ maxWith: "50%", marginTop: 12, marginBottom: 10 }}
      >
        Classement
      </Typography>

      <Typography
        component="h1"
        variant="h5"
        align="center"
        sx={{ maxWith: "50%", marginTop: 12, marginBottom: 10 }}
      >
        Suggestion
      </Typography>
    </Box>
  );
};

export default ListResults;
