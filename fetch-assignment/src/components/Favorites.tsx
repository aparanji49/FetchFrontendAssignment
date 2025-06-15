import { Box, Button, Typography, Grid } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { getDogsbyIDs, getMatch, getLocations } from "../services/dogs";
import { useFavorites } from "../context/FavoritesContext";
import type { Dog, Location } from "../types";
import DogCard from "./DogCard";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { primaryButton } from "../styles/buttonStyles";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Favorites: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [matchDog, setMatchDog] = useState<Dog | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { favoriteIds, matchId, setMatchId } = useFavorites();
  const [width, height] = useWindowSize();
  const [matchLocation, setMatchLocation] = useState<Location | null>(null);

  // get favorite dog ids - favorite dogs
  const getFavorites = async () => {
    if (favoriteIds.length > 0) {
      const response = await getDogsbyIDs(favoriteIds);
      setDogs(response.data);
    } else {
      setDogs([]);
    }
  };

  useEffect(() => {
    const fetchMatchDog = async () => {
      if (matchId) {
        const res = await getDogsbyIDs([matchId]);
        setMatchDog(res.data[0]);
      }
    };
    fetchMatchDog();
  }, [matchId]);

  // upon clicking on find match button
  const handleMatch = async () => {
    const response = await getMatch(favoriteIds);
    const matchId = response.data.match;
    setMatchId(matchId);
    const matchedDogResponse = await getDogsbyIDs([matchId]);
    const matchedDog = matchedDogResponse.data[0];
    setMatchDog(matchedDog);

    // get location for matched dog's zip code

    const locationResponse = await getLocations([matchedDog.zip_code]);
    setMatchLocation(locationResponse.data[0]);

    setShowConfetti(true);

    // hide confetti after 5 seconds
    setTimeout(() => setShowConfetti(false), 5000);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getFavorites();
  }, [favoriteIds]);

  useEffect(() => {
  if (matchId && matchDog && favoriteIds.length > 1) {
    setMatchDog(null);
    setMatchId(null);
    setMatchLocation(null);
  }
}, [favoriteIds, matchDog, matchId]);

  return (
    <>
      <Header />
      <Box p={4} sx={{backgroundColor: "#f9f7f2", height:"100%", minHeight:"100dvh"}}>
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
              disabled={dogs.length < 2 || !!matchDog}
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
              Add dogs to your favorite list by searching among what we have
              listed on the <Link to={"/search"}>search page</Link>!
            </Typography>
          </Box>
        ) : dogs.length === 1 ? (
          <Box textAlign="center" mt={6}>
            <Typography variant="h6" color="text.secondary">
              You’ve selected just one favorite dog 🐶
            </Typography>
            <Typography variant="body1" color="text.secondary">
              To find a match, you need at least two favorites. Browse more on
              the <Link to={"/search"}>search page</Link>!
            </Typography>
          </Box>
        ) : (
          <>
            {matchDog && (
              <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "2rem",
  }}
>
                <Typography
                  variant="h6"
                  textAlign="center"
                  color="primary"
                  gutterBottom
                >
                  🎉 Here's your match!
                </Typography>
                <Box maxWidth={345} width="100%">
                  <DogCard
                    dog={matchDog}
                    isFavorite={true}
                    onToggleFavorite={() => {}}
                    showFavoriteIcon={false}
                  />
                  {matchLocation && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mt={1}
                      textAlign="center"
                    >
                      {matchLocation.city}, {matchLocation.state}
                    </Typography>
                  )}
                  {matchLocation && (
                    <iframe
                      title="dog-location"
                      width="100%"
                      height="250"
                      frameBorder="0"
                      style={{
                        border: 0,
                        borderRadius: "8px",
                        marginTop: "10px",
                      }}
                      src={`https://www.google.com/maps?q=${matchLocation.latitude},${matchLocation.longitude}&hl=en&z=14&output=embed`}
                      allowFullScreen
                    ></iframe>
                  )}
                  {/* Directions button */}
                  {matchLocation && (
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={primaryButton}
                        href={`https://www.google.com/maps/dir/?api=1&destination=${matchLocation.latitude},${matchLocation.longitude}`}
                        target="_blank"
                      >
                        Get Directions
                      </Button>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={1}
                        textAlign="center"
                      >
                        Your favorite dogs:
                      </Typography>
                    </>
                  )}
                </Box>
              </motion.div>
            )}

            <Grid container spacing={3}>
              {dogs.map((dog) => (
                <Grid item xs={12} sm={6} md={4} key={dog.id}>
                  <DogCard
                    dog={dog}
                    isFavorite={true}
                    onToggleFavorite={() => {}}
                  />
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
