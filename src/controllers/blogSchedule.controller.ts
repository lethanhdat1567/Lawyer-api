import { HttpStatus } from "../constants/httpStatus.js";
import blogScheduleService from "../services/blog-schedule.service.js";

class BlogScheduleController {
    async toggleStatus(req: any, res: any) {
        const [error, result] = await blogScheduleService.toggleSchedule(req.params.id);

        if (error) {
            res.error({
                message: error,
                status: HttpStatus.NOT_FOUND,
            });
        }

        console.log(result);

        return res.success(result);
    }
    async updateSchedule(req: any, res: any) {
        const schedule = await blogScheduleService.updateSchedule(req.params.id, req.body);
        return res.success(schedule);
    }
}

export default new BlogScheduleController();
