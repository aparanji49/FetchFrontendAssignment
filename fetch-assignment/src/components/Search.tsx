import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Dog } from "../types";
import { getDogsbyIDs, getSearchResults } from "../services/dogs";
import DogCard from "./DogCard";
import Grid from "@mui/material/Grid";

import Pagination from "@mui/material/Pagination";

const Search: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);
  const [dogIds, setDogIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 25;

  const getDogs = async (page: number = 1) => {
    try {
      setLoading(true);
      const from = (page - 1) * pageSize;
      // get results from search api
      const searchResults = await getSearchResults({ from, sort: "breed:asc" });
      const data = searchResults.data;
      setDogIds(data.resultIds);
      setNext(data.next ?? null);
      setPrev(data.prev ?? null);
      setCurrentPage(page);
      setTotalPages(Math.ceil(data.total / pageSize));
      // pass these dog ids into dogs api and get dogs data
      const dogsResults = await getDogsbyIDs(data.resultIds);

      setDogs(dogsResults.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error("Error fetching dogs", error);
    } finally {
      // results are ready so loading should go away
      setLoading(false);
    }
  };
  useEffect(() => {
    getDogs(1);
  }, []);
  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Browse Dogs
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {dogs.map((dog) => (
              <Grid item xs={12} sm={6} md={4} key={dog.id}>
                <DogCard dog={dog} />
              </Grid>
            ))}
          </Grid>
          {/* Pagination Controls */}
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => getDogs(page)}
              color="secondary"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Search;
