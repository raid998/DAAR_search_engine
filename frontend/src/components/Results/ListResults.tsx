import { Card, CardContent, Typography } from "@mui/material";
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
            alignItems: "center",
            justify: "center",
          },
          marginBottom: 1,
          margin: 5,
        }}
      >
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
    </Box>
  );
};

export default ListResults;
