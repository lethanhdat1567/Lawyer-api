import { createBlogByAI } from "../services/blog.service.js";

async function blogAI() {
    const result = await createBlogByAI();
    console.log(result);

    return;
}

export default blogAI;
