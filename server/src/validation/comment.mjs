export const commentSchema = {
    content: {
        in: ["body"],
        isString: true,
        isLength: {
            min: 5,
            errorMessage: "Comment length must be greater than 5"
        }
    }
}
