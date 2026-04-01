import {
    adminCreateHubCategory,
    adminSoftDeleteHubCategory,
    adminUpdateHubCategory,
} from "../hub.service.js";

class HubCategoryAdminService {
    createCategory = adminCreateHubCategory;
    updateCategory = adminUpdateHubCategory;
    deleteCategory = adminSoftDeleteHubCategory;
}

export default new HubCategoryAdminService();
