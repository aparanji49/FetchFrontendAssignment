import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getBreeds, searchLocations } from "../services/dogs";
import {
  type SearchFiltersProps,
  type SortOrder,
  type Location,
} from "../types";
import { primaryButton, secondaryButton } from "../styles/buttonStyles";

const SearchFilters: React.FC<SearchFiltersProps> = ({ onApply, onClear }) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [zipCode, setZipCode] = useState("");
  const [ageMin, setAgeMin] = useState<number | "">("");
  const [ageMax, setAgeMax] = useState<number | "">("");
  const [sortField, setSortField] = useState("breed");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Location filters
  const [selectedState, setSelectedState] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [availableCounties, setAvailableCounties] = useState<string[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const res = await getBreeds();
        setBreeds(res.data);
      } catch (error) {
        console.error("Failed to fetch breeds", error);
      }
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    const fetchLocationOptions = async () => {
      try {
        const response = await searchLocations({ size: 10000 });
        const locations = response.data.results as unknown as Location[];

        // Get unique sorted states
        const uniqueStates = Array.from(
          new Set(locations.map((l: Location) => l.state))
        ).sort();
        setAvailableStates(uniqueStates);
      } catch (err) {
        console.error("Failed to load location data", err);
      }
    };
    fetchLocationOptions();
  }, []);
  useEffect(() => {
    const fetchLocationOptions = async () => {
      try {
        const response = await searchLocations({ size: 10000 });
        const locations = response.data.results as unknown as Location[];

        // Get unique sorted states
        const uniqueStates = Array.from(
          new Set(locations.map((l: Location) => l.state))
        ).sort();
        setAvailableStates(uniqueStates);
      } catch (err) {
        console.error("Failed to load location data", err);
      }
    };
    fetchLocationOptions();
  }, []);

  useEffect(() => {
    const fetchFilteredLocations = async () => {
      if (!selectedState) return;
      try {
        const response = await searchLocations({ states: [selectedState], size: 10000 });
        const locations = response.data.results as unknown as Location[];

        const counties = Array.from(
          new Set(locations.map((l) => l.county))
        ).sort();
        const cities = Array.from(new Set(locations.map((l) => l.city))).sort();

        setAvailableCounties(counties);
        setAvailableCities(cities);
      } catch (err) {
        console.error("Error fetching cities/counties", err);
      }
    };
    fetchFilteredLocations();
  }, [selectedState]);

  const handleApply = () => {
    if ((ageMin !== "" && ageMin < 1) || (ageMax !== "" && ageMax < 1)) {
      alert("Please enter an age of at least 1 year.");
      return;
    }

    const locationFilter = zipCode
      ? { zipCodes: [zipCode] }
      : {
          city: selectedCity || undefined,
          states: selectedState ? [selectedState] : undefined,
        };

    onApply({
      breeds: selectedBreeds.length ? selectedBreeds : undefined,
      zipCodes: zipCode ? [zipCode] : undefined,
      ageMin: ageMin !== "" ? Number(ageMin) : undefined,
      ageMax: ageMax !== "" ? Number(ageMax) : undefined,
      sort: `${sortField}:${sortOrder}`,
      ...locationFilter,
    });
  };

  const handleClear = () => {
    setSelectedBreeds([]);
    setZipCode("");
    setAgeMin("");
    setAgeMax("");
    setSortField("breed");
    setSortOrder("asc");
    setSelectedState("");
    setSelectedCity("");
    setSelectedCounty("");
    onClear();
  };

  const handleBreedChange = (value: string[]) => {
    if (value.includes("ALL")) {
      setSelectedBreeds(selectedBreeds.length === breeds.length ? [] : breeds);
    } else {
      setSelectedBreeds(value);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        mb: 4,
        backgroundColor: "#fafafa",
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom textAlign="left">
        Filters
      </Typography>

      <Stack spacing={4}>
        {/* Row 1: Breeds, Zip, Age Min/Max */}
        <Stack direction="row" spacing={3} flexWrap="wrap">
          <FormControl
            fullWidth
            sx={{ minWidth: 200, flexGrow: 1, marginBottom: "2rem" }}
          >
            <InputLabel>Breed</InputLabel>
            <Select
              multiple
              value={selectedBreeds}
              sx={{ marginBottom: "1rem" }}
              onChange={(e) => handleBreedChange(e.target.value as string[])}
              renderValue={(selected) =>
                selected.length === breeds.length
                  ? "All Breeds"
                  : selected.join(", ")
              }
              label="Breed"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 40 * 10,
                    overflowY: "auto",
                  },
                },
              }}
            >
              <MenuItem value="ALL">
                <em>
                  {selectedBreeds.length === breeds.length
                    ? "Deselect All"
                    : "Select All"}
                </em>
              </MenuItem> 
              {breeds.map((breed) => (
                <MenuItem key={breed} value={breed}>
                  {breed}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Age Min"
            type="number"
            value={ageMin}
            onChange={(e) =>
              setAgeMin(
                e.target.value === "" ? "" : Math.max(1, Number(e.target.value))
              )
            }
            inputProps={{ min: 1 }}
            sx={{ minWidth: 120, flexGrow: 1, marginBottom: "1rem" }}
          />

          <TextField
            label="Age Max"
            type="number"
            value={ageMax}
            onChange={(e) =>
              setAgeMax(
                e.target.value === "" ? "" : Math.max(1, Number(e.target.value))
              )
            }
            inputProps={{ min: 1 }}
            sx={{ minWidth: 120, flexGrow: 1, marginBottom: "1rem" }}
          />
          <TextField
            label="Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            sx={{ minWidth: 160, flexGrow: 1, marginBottom: "1rem" }}
          />
        </Stack>

        {/* Row 2: Location */}
        <Stack direction="row" spacing={3} flexWrap="wrap">
          <FormControl sx={{ minWidth: 160, flexGrow: 1 }}>
            <InputLabel>State</InputLabel>
            <Select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {availableStates.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 160, flexGrow: 1 }}>
            <InputLabel>County</InputLabel>
            <Select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              disabled={!selectedState}
            >
              {availableCounties.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 160, flexGrow: 1 }}>
            <InputLabel>City</InputLabel>
            <Select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState}
            >
              {availableCities.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {/* Row 3: Sorting */}
        <Stack direction="row" spacing={3} flexWrap="wrap">
          <FormControl sx={{ minWidth: 160, flexGrow: 1 }}>
            <InputLabel>Sort Field</InputLabel>
            <Select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              label="Sort Field"
            >
              <MenuItem value="breed">Breed</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="age">Age</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 160, flexGrow: 1 }}>
            <InputLabel>Order</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              label="Order"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* Row 3: Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={handleClear} sx={secondaryButton}>
            Clear Filters
          </Button>
          <Button variant="contained" onClick={handleApply} sx={primaryButton}>
            Apply Filters
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default SearchFilters;
