import React from "react";
import UpArrow from "../assets/up_arrow.png";
import NoResults from "../assets/noRes.png";
import { Constants } from "../constants/constants";

export const Table = ({
  sortOrder,
  setSortOrder,
  filteredResults,
  page,
  setTeamID,
  TeamModal,
}) => {
  const { paginationValue } = Constants;
  return (
    <div className="table">
      <h3 className="table-header-item table-item">
        <div>Team Name</div>
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSortOrder(!sortOrder)}
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
        className="table-body"
        style={{
          gridTemplateRows: filteredResults?.length
            ? `repeat(${paginationValue},1fr)`
            : "1fr",
        }}
      >
        {filteredResults?.length ? (
          filteredResults
            .filter(
              (item, index) =>
                index >= paginationValue * (page - 1) &&
                index < paginationValue * page
            )
            .map((team) => (
              <div
                className="table-body-item table-item"
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
  );
};
