import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import ListResults from "../Results/ListResults";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { z, TypeOf } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
const SearchEngine = () => {
  const [results, setResults] = useState([]);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.offsetHeight);
  }, []);

  const querySchema = z.object({
    query: z.string().min(1, {
      message: "Veuillez saisir un texte dans la barre de recherche",
    }),
  });
  type QueryInput = TypeOf<typeof querySchema>;

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<QueryInput>({ resolver: zodResolver(querySchema) });
  const submitQuery = async (data: QueryInput) => {
    const request = await axios.get(
      "http://localhost:8080/api/search?query=" + data.query
    );
    const books = request.data.map(
      (
        book: any & {
          id: number;
          titre: string;
          auteurs: string[];
          texte: string;
          link: string;
        }
      ) => ({
        id: book.id,
        titre: book.titre,
        auteurs: book.auteurs,
        texte: book.texte,
        link: book.link,
      })
    );
    setResults(books);
  };
  return (
    <Box>
      <Container maxWidth="md">
        <Paper
          ref={ref}
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 3,
            marginBottom: 1,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{ maxWith: "50%", marginBottom: 8, marginTop: 3 }}
          >
            Moteur de recherche
          </Typography>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
            onSubmit={handleSubmit(submitQuery)}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Rechercher un livre..."
              inputProps={{ "aria-label": "rechercher un livre" }}
              {...register("query")}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <InputLabel color="error">{errors.query?.message}</InputLabel>

          <FormControl sx={{ marginTop: 2, marginBottom: 2 }}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="simple"
                control={<Radio />}
                label="Simple"
              />
              <FormControlLabel
                value="avancee"
                control={<Radio />}
                label="Avancée"
              />
            </RadioGroup>
          </FormControl>
        </Paper>
        <ListResults height={height} books={results} />
      </Container>
    </Box>
  );
};

export default SearchEngine;
