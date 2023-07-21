import { getDashBoardDataService } from "../services/dashboardDataService";
import END_POINTS from "../../constants/endpoints";

export const getDashboardData = () => {
  return getDashBoardDataService(END_POINTS.ADMIN_DASHBOARD_DATA);
};
