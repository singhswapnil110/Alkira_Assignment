import { React, useContext, useState } from "react";
import SearchIcon from "../assets/search_icon.png";
import { useFetch } from "../hooks/useFetch";
import { Table } from "./Table";
import { actions, constants } from "../constants/constants";
import { ReducerContext } from "../store/reducerContext";
import Github from "../assets/github.png";

export const Home = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { paginationValue } = constants;
  const [state, dispatch] = useContext(ReducerContext);

  const { teamsData: tableData } = state;
  useFetch(constants.teams_API_ENDPOINT, {}, actions.setTeamsData, dispatch);

  const filteredResults = tableData?.filter(
    (item) =>
      item.abbreviation.toLowerCase().includes(searchTerm) ||
      item.city.toLowerCase().includes(searchTerm) ||
      item.full_name.toLowerCase().includes(searchTerm) ||
      item.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="Home">
      <header>
        <h2 style={{ color: "#074684" }}>NBA TEAMS</h2>
        <div className="input-box">
          <img
            alt="Search Icon"
            src={SearchIcon}
            style={{
              position: "absolute",
              left: "5px",
              top: "5px",
              transform: "scale(0.8)",
            }}
          />
          <label id="searchInput" hidden>
            Search Bar
          </label>
          <input
            aria-labelledby="searchInput"
            type="text"
            onChange={(e) => (
              setSearchTerm(e.target.value.toLowerCase()), setPage(1)
            )}
          />
        </div>
      </header>
      <div className="table-container">
        <Table filteredResults={filteredResults} page={page} />
      </div>
      <div className="button-group">
        <div className="page-button-group">
          <button
            disabled={page == 1 || !filteredResults.length}
            onClick={() => setPage(page - 1)}
          >
            -
          </button>
          <span style={{ fontSize: "large" }}>{page}</span>
          <button
            disabled={
              page == Math.ceil(filteredResults?.length / paginationValue) ||
              !filteredResults?.length
            }
            onClick={() => setPage(page + 1)}
          >
            +
          </button>
        </div>
        <a
          href="https://github.com/singhswapnil110/Alkira_Assignment"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="code-button">
            Code <img src={Github} />
          </button>
        </a>
      </div>
    </div>
  );
};
