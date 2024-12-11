export const updateUserSchema = {
    name: {
        in: ["body"],
       isString: true,
        isLength: {
            errorMessage: "Name must be at least 2 characters long",
            options: { min: 2 }
        },
        optional: true
    },

}