import * as mineflayer from "mineflayer";
import pkg from 'mineflayer-pathfinder';
import * as dotenv from "dotenv";
import {actions} from "./config/actions.js";

dotenv.config();
const {pathfinder, Movements, goals} = pkg;
const {GoalNear} = goals;

const threadId = process.argv[2];

(async () => {
    let logged = false;
    // @ts-ignore
    const bot = mineflayer.createBot({
        host: process.env.SERVER_HOST,
        port: process.env.SERVER_PORT,
        username: process.env.MINECRAFT_USERNAME + threadId,
        auth: "offline",
        version: "1.19.2"
    })
    //bot.loadPlugin(pathfinder)

    bot.on('chat', (username, message) => {
        console.log('RCV: ' + message)
        if (username === bot.username) return
        //bot.chat(message)
    })

    // Log errors and kick reasons:
    bot.once('spawn', async () => {
        console.log('Logging user #' + threadId)
        //console.log(`I spawned! I'll start my ${actions.length} actions!`)
        for (const action of actions) {
            //console.log('I\'ll wait ' + action.time + ' seconds...')
            await sleep(action.time)
            bot.chat(action.chat)
            if (action.emit) bot.emit(action.emit.eventName)
            await sleep(1)
        }
        await sleep(180);
        bot.quit();
    })

    bot.on('logged', async () => {
        console.log('Logged user #' + threadId)
        logged = true;
        //await followFirstPlayer(bot, logged);
    })

    /*bot.on('move', async () => {
        await followFirstPlayer(bot, logged);
    })*/

    bot.on('kicked', console.log)
    bot.on('error', console.log)
})()

async function followFirstPlayer(bot, logged) {
    if (!logged) return;
    const playerNames = Object.keys(bot.players).filter(name => name !== bot.username)
    const players = playerNames.map((name) => {
        return bot.players[name]
    })
    //console.log(`I'll follow ${playerNames[0]}!`)
    const nextLocation = players[0]?.entity?.position

    const defaultMove = new Movements(bot)
    defaultMove.allowSprinting = true
    defaultMove.sprint = true
    defaultMove.allowParkour = true
    bot.pathfinder.setMovements(defaultMove)
    bot.pathfinder.setGoal(new GoalNear(nextLocation.x, nextLocation.y, nextLocation.z, 1))
}

async function sleep(time) {
    return await new Promise((resolve) => {
        setInterval(() => {
            resolve();
        }, time * 1000)
    });
}
