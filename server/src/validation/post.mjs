
// bu melimatlari req.bodyden goturruk useri ise cookieden 

const createPostValidationSchema = {
    title: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'Title is required',
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'Name must be at least 3 characters long',
        },
    },
    img: {
        custom: {
            options: (_, {req}) => {
                if(!req.file){
                    throw new Error("Image is required")
                }
                return true;
            }
        }
    },
    content: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Content is required',
        },
        isLength: {
            options: { max: 50 },
            errorMessage: 'You reached the maximum number of characters',
        },
    },
    tags: {
        in: ['body'],
        isString: true,
        optional: true
    },
};

const editPostValidationSchema = {
    title: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'Title is required',
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'Name must be at least 3 characters long',
        },
    },
    content: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Content is required',
        },
        isLength: {
            options: { max: 50 },
            errorMessage: 'You reached the maximum number of characters',
        },
    },
    tags: {
        in: ['body'],
        isString: true,
        optional: true
    },
};

export default {
    createPostValidationSchema,
    editPostValidationSchema,
}
