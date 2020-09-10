### yarn dev

to run development server

### yarn build 


compile a version in build folder

### yarn start



## GeoLocate component:

- place the component inside one of your component and it will set the userState.location
  to the current latitude and longitude. Asks users permission.

## LocationSearch component:

- it's a plain input text with a search button.
  place inside your component passing two arguments:

1. radius
2. controller

radius it's the distance inside which the search will be done, controller is a useState hook
set to an empty array

**eg:**

const [searchResults, setSearchResults ] = useState([])
return(
<LocationSearch radius={2000} controller={[searchResults, setSearchResults]}>
)

once the button 'search' is clicked it the results will be stored inside searchResult state
