export const actions = [
    {
        id: 1,
        name: "Register",
        time: 2,
        chat: '/register 12345678 12345678',
    },
    {
        id: 2,
        name: "Login",
        time: 2,
        chat: '/login 12345678'
    },
    {
        id: 3,
        name: "ConnectFarmrun",
        time: 5,
        chat: '/farmrun',
        emit: {
            eventName: 'logged',
        }
    },
    {
        id: 5,
        name: "CreateIsland",
        time: 10,
        chat: '/is new'
    },
    {
        id: 6,
        name: "IslandGO",
        time: 13,
        chat: '/is'
    }
]
