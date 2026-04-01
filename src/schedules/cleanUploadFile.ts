import clearTrashService from "../services/clear-trash.service.js";

export const cleanUploadFile = async () => {
    await clearTrashService.handleCleanTrash();
};
