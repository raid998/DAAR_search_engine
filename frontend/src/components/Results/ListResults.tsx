import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { IBook } from "../../types";
import { theme } from "../../utils/theme";
import "./results.css";
const ListResults = ({
  height,
  books,
  suggestions,
}: {
  height: number;
  books: IBook[];
  suggestions: Record<number, any>;
}) => {
  return (
    <Box
      flexDirection={"column"}
      justifyContent="flex-start"
      alignItems={"center"}
      sx={{
        maxHeight: `calc(100vh - ${height}px - 2rem)`,
        overflowY: "auto",
      }}
    >
      {books.map((book) => (
        <Card
          key={book.id}
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
                <Link to={book.link} replace>
                  {book.titre}
                </Link>
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
                by{" "}
                {book.auteurs.map(
                  (auteur) =>
                    (auteur.split(",")[1] ?? "") +
                    " " +
                    (auteur.split(",")[0] ?? "")
                )}
              </Typography>
              Suggested books :{" "}
              <ul>
                {suggestions[book.id].map((book: any) => (
                  <li key={book.id}>
                    <Link to={book.link} replace>
                      {book.titre}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default ListResults;
