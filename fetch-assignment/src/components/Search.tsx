import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Dog } from "../types";
import { getDogsbyIDs, getSearchResults } from "../services/dogs";
import DogCard from "./DogCard";
import Grid from "@mui/material/Grid";

import Pagination from "@mui/material/Pagination";
import SearchFilters from "./SearchFilters";

const Search: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [dogIds, setDogIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 25;
  const [filters, setFilters] = useState({ sort: "breed:asc" });
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const getDogs = async (page: number = 1, appliedFilters = filters) => {
    try {
      setLoading(true);
      const from = (page - 1) * pageSize;

      // get results from search api
      const searchResults = await getSearchResults({ ...appliedFilters, from });
      const data = searchResults.data;

      setDogIds(data.resultIds);
      setCurrentPage(page);
      setTotalPages(Math.ceil(data.total / pageSize));

      // pass these dog ids into dogs api and get dogs data
      const dogsResults = await getDogsbyIDs(data.resultIds);

      setDogs(dogsResults.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching dogs", error);
    } finally {
      // results are ready so loading should go away
      setLoading(false);
    }
  };

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    getDogs(1, newFilters);
  };

  const handleClearFilters = () => {
    setFilters({ sort: "breed:asc" });
    getDogs(1, { sort: "breed:asc" });
  };

  useEffect(() => {
    getDogs(1);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Browse Dogs
      </Typography>

      <SearchFilters
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {dogs.length === 0 ? (
            <Box mt={4} display="flex" justifyContent="center">
              <Typography variant="h6" color="text.secondary">
                No dogs found for the selected filters.
              </Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {dogs.map((dog) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} display="flex" key={dog.id}>
                    <DogCard
                      dog={dog}
                      isFavorite={favoriteIds.includes(dog.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </Grid>
                ))}
              </Grid>

              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, page) => getDogs(page, filters)}
                  color="secondary"
                />
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Search;
