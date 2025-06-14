import { Box, Button, Typography, Grid } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { getDogsbyIDs, getMatch } from "../services/dogs";
import { useFavorites } from "../context/FavoritesContext";
import type { Dog } from "../types";
import DogCard from "./DogCard";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const Favorites: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [matchDog, setMatchDog] = useState<Dog | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const {favoriteIds} = useFavorites();
  const [width, height] = useWindowSize();

  const getFavorites = async () => {
    if (favoriteIds.length > 0) {
      const response = await getDogsbyIDs(favoriteIds);
      setDogs(response.data);
    } else {
      setDogs([]);
    }
  };

  const handleMatch = async () => {
    const response = await getMatch(favoriteIds);
    const matchId = response.data.match;
    const matchedDogResponse = await getDogsbyIDs([matchId]);
    setMatchDog(matchedDogResponse.data[0]);
    setShowConfetti(true);

    // hide confetti after 5 seconds
    setTimeout(() => setShowConfetti(false), 5000);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getFavorites();
  }, [favoriteIds]);

  return (
    <>
      <Header />
      <Box p={4}>
        {showConfetti && <Confetti width={width} height={height} />}

        <Box textAlign="center" mb={4}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Your Favorite Dogs
          </Typography>
          {dogs.length > 0 && (
           <Button
            variant="contained"
            color="secondary"
            onClick={handleMatch}
            disabled={dogs.length < 2}
            sx={{ mt: 2 }}
          >
            Find My Match
          </Button>
          )}
          
        </Box>

        {dogs.length === 0 ? (
          <Box textAlign="center" mt={6}>
            <Typography variant="h6" color="text.secondary">
              No favorite dogs 😔
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Add dogs to your favorite list by searching among what we have listed on the search page!
            </Typography>
          </Box>
        ) : (
          <>
        {matchDog && (
          <Box mb={4} p={2} sx={{ animation: "fadeIn 0.8s ease-in-out" }}>
            <Typography variant="h6" textAlign="center" color="primary" gutterBottom>
              🎉 Here's your match!
            </Typography>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <DogCard dog={matchDog} isFavorite={true} onToggleFavorite={() => {}} 
  showFavoriteIcon={false}/>
   {/* Embed Map */}
    <Box mt={2}>
      <iframe
        title="Dog Location"
        width="100%"
        height="200"
        style={{ borderRadius: '8px', border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://maps.google.com/maps?q=${matchDog.zip_code}&z=13&output=embed`}
      ></iframe>
    </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        <Grid container spacing={3}>
          {dogs.map((dog) => (
            <Grid item xs={12} sm={6} md={4} key={dog.id}>
              <DogCard dog={dog} isFavorite={true} onToggleFavorite={() => {}} />
            </Grid>
          ))}
        </Grid>  
          </>
        )}

        
      </Box>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </>
  );
};

export default Favorites;
