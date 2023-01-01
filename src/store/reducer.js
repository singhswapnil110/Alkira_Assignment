const sortData = (tableData, sortOrder) =>
  tableData.sort((a, b) =>
    sortOrder ? (a.city > b.city ? 1 : -1) : a.city < b.city ? 1 : -1
  );

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TEAMS_DATA":
      return {
        ...state,
        teamsData: sortData(action.payload.data, state.sortOrder),
      };
    case "SET_GAMES_DATA":
      return { ...state, gamesData: action.payload };
    case "SORT_TEAMS_DATA":
      return {
        ...state,
        sortOrder: !state.sortOrder,
        teamsData: sortData(state.teamsData, !state.sortOrder),
      };
  }
};
