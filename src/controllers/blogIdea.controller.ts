import blogIdeaService from "../services/blog-idea.service.js";

class BlogIdeaController {
    async listIdeas(req: any, res: any) {
        const ideas = await blogIdeaService.listIdeas();
        return res.success(ideas);
    }

    async createIdea(req: any, res: any) {
        const [error, result] = await blogIdeaService.createWithQuantity(req.body.quantity, req.body.prompt);

        if (error) {
            throw new Error(error);
        }

        return res.success(result);
    }

    async destroyIdea(req: any, res: any) {
        const idea = await blogIdeaService.destroy(req.params.id);
        return res.success(idea);
    }
}

export default new BlogIdeaController();
