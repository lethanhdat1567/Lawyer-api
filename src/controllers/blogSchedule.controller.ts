import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import blogScheduleService from "../services/blog-schedule.service.js";

class BlogScheduleController {
    async getSchedule(_req: any, res: any) {
        const schedule = await blogScheduleService.getSchedule();
        return res.success({ schedule });
    }

    async toggleStatus(req: any, res: any) {
        const [error, result] = await blogScheduleService.toggleSchedule(req.params.id);

        if (error) {
            res.error({
                code: ErrorCode.NOT_FOUND,
                message: error,
                statusCode: HttpStatus.NOT_FOUND,
            });
            return;
        }

        return res.success(result);
    }
    async updateSchedule(req: any, res: any) {
        const schedule = await blogScheduleService.updateSchedule(req.params.id, req.body);
        return res.success(schedule);
    }
}

export default new BlogScheduleController();
