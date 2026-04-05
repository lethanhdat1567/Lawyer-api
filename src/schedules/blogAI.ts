import { createBlogByAI } from "../services/blog.service.js";

async function blogAI() {
    console.log("Blog AI started");
    await createBlogByAI();

    console.log("Blog AI completed");
    return;
}

export default blogAI;
