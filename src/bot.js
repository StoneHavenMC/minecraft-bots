import * as mineflayer from "mineflayer";
import * as dotenv from "dotenv";
import {plugin} from "mineflayer-movement";
import pkg from 'mineflayer-pathfinder';
import {v4} from "uuid";

const {pathfinder, goals, Movements} = pkg;

dotenv.config();

const randomNameSufix = v4().substring(0, 5)
let spawn;

(async () => {
    // @ts-ignore
    let bot = mineflayer.createBot({
        host: process.env.SERVER_HOST,
        port: process.env.SERVER_PORT,
        username: process.env.MINECRAFT_USERNAME + randomNameSufix,
        auth: "offline",
        version: "1.21.4",
        physicsEnabled: true
    })

    // Log errors and kick reasons:
    bot.once('spawn', async () => {
        console.log('Logging user #' + bot.username)
        spawn = {
            x: bot.entity.position.x,
            y: bot.entity.position.y,
            z: bot.entity.position.z,
        }
        bot.loadPlugin(pathfinder)
        plugin(bot);
        const defaultMove = new Movements(bot)
        defaultMove.allowSprinting = true;
        defaultMove.allowParkour = true
        bot.pathfinder.setMovements(defaultMove)
        await walkRandomly(bot)
        // bot.quit();
    })

    setInterval(() => {
        bot.chat('Coucou, ceci est un message')
    }, 8_000)

    bot.on('kicked', console.log)
    bot.on('end', console.log)
    bot.on('error', console.log)

    bot.on('kicked', (reason, loggedIn) => {
        setTimeout(() => {
            reconnect();
        }, 30 * 1000);
    })
    bot.on('error', (err) => {
        setTimeout(() => {
            reconnect();
        }, 30 * 1000);
    })

    function reconnect() {
        bot.end()
        bot = mineflayer.createBot({
            host: process.env.SERVER_HOST,
            port: process.env.SERVER_PORT,
            username: process.env.MINECRAFT_USERNAME + randomNameSufix,
            auth: "offline",
            version: "1.21.4",
            physicsEnabled: true
        })
    }
})
()



async function walkRandomly(bot) {
    const goal = new goals.GoalNear(
        spawn.x + (Math.random() * 20 - 10),
        spawn.y,
        spawn.z + (Math.random() * 20 - 10),
        10
    )
    await bot.pathfinder.goto(goal);
    await walkRandomly(bot)
}

async function sleep(time) {
    return await new Promise((resolve) => {
        setInterval(() => {
            resolve();
        }, time * 1000)
    });
}
