import React, { useContext, useState } from "react";
import UpArrow from "../assets/up_arrow.png";
import NoResults from "../assets/noRes.png";
import { Actions, Constants } from "../constants/constants";
import { ReducerContext } from "../store/reducerContext";
import { useFetch } from "../hooks/useFetch";
import { useModal } from "../hooks/useModal";
import { Team } from "./Team";

export const Table = ({ filteredResults, page }) => {
  const { paginationValue } = Constants;
  const [state, dispatch] = useContext(ReducerContext);
  const [teamID, setTeamID] = useState(null);
  const { sortOrder } = state;
  let TeamModal = useModal(
    <Team gamesData={state.gamesData} teamID={teamID} />,
    () => setTeamID(null)
  );

  useFetch(
    teamID ? Constants.games_API_ENDPOINT + teamID : null,
    {},
    Actions.setGamesData,
    dispatch
  );

  const openTeamModal = (teamId) => {
    setTeamID(teamId);
    TeamModal.setModalState(true);
  };

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
          onClick={() => dispatch({ type: Actions.sortTeamsData })}
          id={!sortOrder ? "up" : "down"}
        >
          City
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
                onClick={() => openTeamModal(team.id)}
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
      {TeamModal?.modalComponent}
    </div>
  );
};
