import { React, useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import { Team } from "./Team";
import SearchIcon from "../assets/search_icon.png";
import UpArrow from "../assets/up_arrow.png";
import NoResults from "../assets/noRes.png";

export const Home = () => {
  useEffect(() => {
    fetch("https://www.balldontlie.io/api/v1/teams")
      .then((data) => data.json())
      .then((res) => setTableData(res.data))
      .then(sortData);
  }, []);

  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [teamID, setTeamID] = useState(null);
  const [sortOrder, setSortOrder] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const paginationValue = 8;

  const sortData = () => {
    if (tableData.length)
      setTableData(
        [...tableData].sort((a, b) =>
          sortOrder ? (a.city > b.city ? 1 : -1) : a.city < b.city ? 1 : -1
        )
      );
  };

  const filteredResults = tableData.filter(
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
        <div className="table">
          <h3 className="table-header table-item">
            <div>Team Name</div>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => (setSortOrder(!sortOrder), sortData())}
              id={!sortOrder ? "up" : "down"}
            >
              City{" "}
              <img src={UpArrow} style={{ width: "20px", margin: "0px 5px" }} />
            </div>
            <div>Abbreviation</div>
            <div>Conference</div>
            <div>Division</div>
          </h3>
          <div
            style={{
              display: "grid",
              height: "90%",
              width: "100%",
              gap: "5px",
              gridTemplateRows: filteredResults.length
                ? `repeat(${paginationValue},1fr)`
                : "1fr",
            }}
          >
            {filteredResults.length ? (
              filteredResults
                .filter(
                  (item, index) =>
                    index >= paginationValue * (page - 1) &&
                    index < paginationValue * page
                )
                .map((team) => (
                  <div
                    className="table-body table-item"
                    onClick={() => {
                      setTeamID(team.id);
                      TeamModal.setModalState(true);
                    }}
                    key={team.id}
                  >
                    <div>{team.full_name}</div>
                    <div>{team.city}</div>
                    <div>{team.abbreviation}</div>
                    <div>{team.conference}</div>
                    <div>{team.division}</div>
                  </div>
                ))
            ) : (
              <img src={NoResults} style={{ width: "100%", height: "100%" }} />
            )}
          </div>
        </div>
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
            page == Math.ceil(filteredResults.length / paginationValue) ||
            !filteredResults.length
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
