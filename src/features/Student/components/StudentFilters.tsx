import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Button
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City, listParams } from 'models';
import * as React from 'react';

export interface IStudentFiltersProps {
  filter: listParams;
  cityList: City[];
  onSearchChange: (filter: listParams) => void;
  onFilterChange: (filter: listParams) => void;
  onClear: (filter: listParams) => void;
}

export default function StudentFilters(props: IStudentFiltersProps) {
  const { filter, onSearchChange, cityList, onFilterChange, onClear } = props;
  const searchRef = React.useRef<HTMLInputElement>()


  // Search Input Change
  const handleChange = (e: any) => {
    // console.log(e.target.value)
    const newFilter = {
      ...filter,
      _page: 1,
      name_like: e.target.value,
    };
    onSearchChange(newFilter);
  };


  // Change City
  const handleCityChange = (e: any) => {
    // console.log(e.target.value);
    const newFilter = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    };
    onFilterChange(newFilter);
  };

  // sort select change
  const handleSortChange = (e: any) => {
    const [_sort, _order] = e.target.value.split(" ")
    // console.log({_sort, _order});
    const newFilter = {
      ...filter,
      _sort: _sort  || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    }
    onFilterChange(newFilter)
  }

  const handleClear = () => {
    const newFilter = {
      _page: 1,
      _limit: 15
    }
    if (searchRef.current) {
      searchRef.current.value = ''
    }
    onClear(newFilter)
  }
  return (
    <Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <FormControl
            fullWidth
            size="small"
            // className={}
            variant="outlined"
          >
            <InputLabel htmlFor="search">Search By Name</InputLabel>
            <OutlinedInput
              id="searchByName"
              onChange={handleChange}
              endAdornment={<Search />}
              label="Search By Name"
              inputRef= {searchRef}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={4} md={6}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCity">City</InputLabel>
            <Select
              labelId="filterByCity"
              value={filter.city || ''}
              onChange={handleCityChange}
              label="City"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList.map((city, index) => (
                <MenuItem key={index} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={3} md={6}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sortBy">Sort</InputLabel>
            <Select
              labelId="sortBy"
              value={filter._sort ? `${filter._sort} ${filter._order}` : ''}
              onChange={handleSortChange}
              label="Sort"
            >
              <MenuItem value="">
                <em>No Sort</em>
              </MenuItem>
              <MenuItem value="name asc">Name ASC</MenuItem>
              <MenuItem value="name desc">Name DESC</MenuItem>
              <MenuItem value="mark asc">Mark ASC</MenuItem>
              <MenuItem value="mark desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={1} md={6}>
          <Button variant="contained" color="primary" onClick={handleClear}>Clear</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
