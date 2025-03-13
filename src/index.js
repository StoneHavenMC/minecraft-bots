import {fork} from "child_process";
import * as dotenv from "dotenv";
dotenv.config();

(async () => {
    const arr = Array.from({ length: process.env.BOT_COUNT }, (_, i) => i + 1);
    for(const id of arr) {
        console.log('Launching bot #' + id)
        fork('src/bot.js', [id]);
        await new Promise((resolve) => {
            setTimeout(() => resolve(), 500)
        });
    }

})()
