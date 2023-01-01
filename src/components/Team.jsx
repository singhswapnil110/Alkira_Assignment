import { React, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export const Team = ({ teamID }) => {
  const { data, meta: metaData } = teamID
    ? useFetch(
        `https://www.balldontlie.io/api/v1/games?seasons[]=2022&team_ids[]=${teamID}`
      )
    : {};

  const gameData = data?.filter((game) => game.home_team.id === teamID)[0];

  return (
    <div className="team-page">
      <h2 className="team-page-header">
        {gameData ? gameData.home_team.name : "Loading..."}
      </h2>
      <div className="team-page-item">
        Team Full Name : <span>{gameData?.home_team.full_name}</span>
      </div>
      <div className="team-page-item">
        Total Games in 2022 : <span>{metaData?.total_count}</span>
      </div>
      <p className="team-page-item">Random Game Details:</p>
      <p className="team-page-item">
        Date <span>{new Date(gameData?.date).toDateString()}</span>
      </p>
      <p className="team-page-item">
        Home Team<span>{gameData?.home_team.name}</span>
      </p>
      <p className="team-page-item">
        Home Team Score<span>{gameData?.home_team_score}</span>
      </p>
      <p className="team-page-item">
        Visitor Team<span>{gameData?.visitor_team.name}</span>
      </p>
      <p className="team-page-item">
        Visitor Team Score
        <span>{gameData ? gameData.visitor_team_score : "Loading...."}</span>
      </p>
    </div>
  );
};
