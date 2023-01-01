import { React, useEffect, useMemo, useState } from "react";
import { useModal } from "../hooks/useModal";
import { Team } from "./Team";
import SearchIcon from "../assets/search_icon.png";
import { useFetch } from "../hooks/useFetch";
import { Table } from "./Table";

export const Home = () => {
  const [page, setPage] = useState(1);
  const [teamID, setTeamID] = useState(null);
  const [sortOrder, setSortOrder] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const paginationValue = 8;

  const { data: tableData, setData: setTableData } = useFetch(
    "https://www.balldontlie.io/api/v1/teams"
  );

  useEffect(() => sortData(), [sortOrder]);

  const sortData = () => {
    if (tableData?.length)
      // setTableData(
      //   [...tableData].sort((a, b) =>
      //     sortOrder ? (a.city > b.city ? 1 : -1) : a.city < b.city ? 1 : -1
      //   )
      // );
      console.log(sortOrder);
  };

  const filteredResults = tableData?.filter(
    (item) =>
      item.abbreviation.toLowerCase().includes(searchTerm) ||
      item.city.toLowerCase().includes(searchTerm) ||
      item.full_name.toLowerCase().includes(searchTerm) ||
      item.name.toLowerCase().includes(searchTerm)
  );

  const TeamModal = useModal(<Team teamID={teamID} />, () => setTeamID(null));

  return (
    <div className="Home">
      <header>
        <h2 style={{ color: "#074684" }}>NBA TEAMS</h2>
        <div className="input-box">
          <img
            src={SearchIcon}
            style={{
              position: "absolute",
              left: "5px",
              top: "5px",
              transform: "scale(0.8)",
            }}
          />
          <input
            type="text"
            onChange={(e) => (
              setSearchTerm(e.target.value.toLowerCase()), setPage(1)
            )}
          />
        </div>
      </header>
      <div className="table-container">
        <Table
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          filteredResults={filteredResults}
          page={page}
          setTeamID={setTeamID}
          TeamModal={TeamModal}
        />
      </div>
      <div className="button-group">
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
      {TeamModal.modalComponent}
    </div>
  );
};
