import {
    adminCreateHubCategory,
    adminDeleteHubCategory,
    adminUpdateHubCategory,
} from "../hub.service.js";

class HubCategoryAdminService {
    createCategory = adminCreateHubCategory;
    updateCategory = adminUpdateHubCategory;
    deleteCategory = adminDeleteHubCategory;
}

export default new HubCategoryAdminService();
