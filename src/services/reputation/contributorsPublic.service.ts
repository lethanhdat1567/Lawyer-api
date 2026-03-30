import { listPublicContributorsLeaderboard } from "../reputation.service.js";

class ContributorsPublicService {
    listLeaderboard = listPublicContributorsLeaderboard;
}

export default new ContributorsPublicService();
