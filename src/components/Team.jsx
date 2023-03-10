export const Team = ({ gamesData, teamID }) => {
  const gameData = gamesData.data?.filter(
    (game) => game.home_team.id === teamID
  )[0];
  const totalGamesPlayed = gamesData.meta?.total_count;
  let skeletonLoadingClassname = gameData ? "" : "skeleton";

  return (
    <div className="team-page">
      <h2 className="team-page-header">
        {gameData ? gameData.home_team.name : "Loading..."}
      </h2>
      <div className="team-page-item">
        Team Full Name :{" "}
        <span className={skeletonLoadingClassname}>
          {gameData?.home_team.full_name}
        </span>
      </div>
      <div className="team-page-item">
        Total Games in 2022 :{" "}
        <span className={skeletonLoadingClassname}>
          {gameData ? totalGamesPlayed : ""}
        </span>
      </div>
      <p className="team-page-item">Random Game Details:</p>
      <p className="team-page-item">
        Date{" "}
        <span className={skeletonLoadingClassname}>
          {gameData ? new Date(gameData.date).toDateString() : ""}
        </span>
      </p>
      <p className="team-page-item">
        Home Team
        <span className={skeletonLoadingClassname}>
          {gameData?.home_team.name}
        </span>
      </p>
      <p className="team-page-item">
        Home Team Score
        <span className={skeletonLoadingClassname}>
          {gameData?.home_team_score}
        </span>
      </p>
      <p className="team-page-item">
        Visitor Team
        <span className={skeletonLoadingClassname}>
          {gameData?.visitor_team.name}
        </span>
      </p>
      <p className="team-page-item">
        Visitor Team Score
        <span className={skeletonLoadingClassname}>
          {gameData?.visitor_team_score}
        </span>
      </p>
    </div>
  );
};
