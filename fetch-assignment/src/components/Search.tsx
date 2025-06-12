import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Dog } from "../types";
import { getDogsbyIDs, getSearchResults } from "../services/dogs";
import DogCard from "./DogCard";
import Grid from '@mui/material/Grid';



const Search: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [dogs, setDogs] = useState<Dog[]>([]);

    useEffect(() => {
        const getDogs = async () => {
            try{
                // get results from search api
                const searchResults = await getSearchResults({size:25, sort: 'breed:asc'});
                // it gives dog ids
                const {resultIds} = searchResults.data;
                // pass these dog ids into dogs api and get dogs data
                const dogsResults = await getDogsbyIDs(resultIds);

                setDogs(dogsResults.data);
            }catch(error){
                console.error('Error fetching dogs', error);
            } finally {
                // results are ready so loading should go away
                setLoading(false);
            }
        };

        getDogs();
    },[]);
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
            <Grid container spacing={3}>
              {dogs.map((dog) => (
                <Grid item xs={12} sm={6} md={4} key={dog.id}>
                  <DogCard
                    dog={dog}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      );
};

export default Search;