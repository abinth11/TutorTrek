import {
  getDashBoardDataService,
  getGraphDataService,
} from "../services/dashboard-data-service";
import END_POINTS from "../../constants/endpoints";

export const getDashboardData = () => {
  return getDashBoardDataService(END_POINTS.ADMIN_DASHBOARD_DATA);
};

export const getGraphData = () => {
  return getGraphDataService(END_POINTS.GET_GRAPH_DATA_ADMIN);
};
