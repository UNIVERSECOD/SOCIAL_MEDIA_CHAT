export const friendshipReqeustSchema ={
    recieverId: {
        in: ['params'],
        isString: true,
        errorMessage: 'Invalid user id',
        notEmpty: true
    }
}