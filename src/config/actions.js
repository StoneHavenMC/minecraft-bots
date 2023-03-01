export const actions = [
    {
        id: 1,
        name: "Register",
        time: 2,
        chat: '/reg 12345678 12345678',
    },
    {
        id: 2,
        name: "Login",
        time: 2,
        chat: '/log 12345678'
    },
    {
        id: 3,
        name: "PostLogin",
        time: 5,
        chat: 'Hello !',
        emit: {
            eventName: 'logged',
        }
    }
]
