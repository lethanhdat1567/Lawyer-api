import { listHubCategories } from "../hub.service.js";

class HubCategoryPublicService {
    listCategories = listHubCategories;
}

export default new HubCategoryPublicService();
