import { useState } from "react";
import Country from "./components/Country";
import data from "./data/countries.json";
import "./styles.css";

function alphaCompare(a, b) {
  return a.name.localeCompare(b.name);
}

function ascCompare(a, b) {
  return a.population - b.population;
}

function descCompare(a, b) {
  return b.population - a.population;
}

function sort(list, compareFunc) {
  return list.sort(compareFunc);
}

function filter(list, filterOption) {
  if (filterOption === "all") {
    return list;
  } else if (filterOption === "<100M") {
    return list.filter((item) => item.population < 100000000);
  } else if (filterOption === "100M+") {
    return list.filter((item) => item.population >= 100000000);
  } else if (filterOption === "200M+") {
    return list.filter((item) => item.population >= 200000000);
  } else if (filterOption === "500M+") {
    return list.filter((item) => item.population >= 500000000);
  } else if (filterOption === "1B+") {
    return list.filter((item) => item.population >= 1000000000);
  } else if (filterOption === "asia") {
    return list.filter((item) => item.continent === "Asia");
  } else if (filterOption === "africa") {
    return list.filter((item) => item.continent === "Africa");
  } else if (filterOption === "europe") {
    return list.filter((item) => item.continent === "Europe");
  } else if (filterOption === "north america") {
    return list.filter((item) => item.continent === "North America");
  } else if (filterOption === "south america") {
    return list.filter((item) => item.continent === "South America");
  }
}

export default function App() {
  const [sortOption, setSortOption] = useState(">");
  const [filterOption, setFilterOption] = useState("all");

  const countries = data.countries;

  function handleSort(e) {
    setSortOption(e.target.value);
  }

  function handleFilter(e) {
    setFilterOption(e.target.value);
  }

  function sortCountries() {
    let func;
    if (sortOption === "alpha") {
      func = alphaCompare;
    } else if (sortOption === "<") {
      func = ascCompare;
    } else {
      func = descCompare;
    }
    return sort(countries.slice(), func);
  }

  const sortedCountries = sortCountries();
  const filteredCountries = filter(sortedCountries.slice(), filterOption);

  return (
    <div className="App">
      <div className="countries">
        <h1>World's largest countries by population</h1>
        <div className="filters">
          <label>
            Sort by:
            <select onChange={handleSort}>
              <option value="alpha">Alphabetically</option>
              <option value="<">Population Asc</option>
              <option value=">">Population Desc</option>
              <option value="shuffle">Shuffle</option>
            </select>
          </label>

          <label>
            Filters:
            <select onChange={handleFilter} value={filterOption}>
              <optgroup label="By continent">
                <option value="all">All</option>
                <option value="asia">Asia</option>
                <option value="africa">Africa</option>
                <option value="europe">Europe</option>
                <option value="north america">North America</option>
                <option value="south america">South America</option>
              </optgroup>
              <optgroup label="By population size">
                <option value="all">All</option>
                <option value="<100M">Less than 100M</option>
                <option value="100M+">100M or more</option>
                <option value="200M+">200M or more</option>
                <option value="500M+">500M or more</option>
                <option value="1B+">1B or more</option>
              </optgroup>
            </select>
          </label>
        </div>
        {filteredCountries.map(function (country) {
          return <Country details={country} key={country.id} />;
        })}
      </div>
    </div>
  );
}
