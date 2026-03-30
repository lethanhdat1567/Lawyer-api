import { applyReputationDelta, listAdminReputationLedger } from "../reputation.service.js";

class ReputationAdminService {
    adjust = applyReputationDelta;
    listLedger = listAdminReputationLedger;
}

export default new ReputationAdminService();
