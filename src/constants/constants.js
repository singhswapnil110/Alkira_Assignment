export const constants = {
  paginationValue: 8,
  teams_API_ENDPOINT: "https://www.balldontlie.io/api/v1/teams",
  games_API_ENDPOINT:
    "https://www.balldontlie.io/api/v1/games?seasons[]=2022&team_ids[]=",
};

export const initialState = {
  teamsData: [],
  gamesData: [],
  sortOrder: true,
};

export const actions = {
  setTeamsData: "SET_TEAMS_DATA",
  setGamesData: "SET_GAMES_DATA",
  sortTeamsData: "SORT_TEAMS_DATA",
};
