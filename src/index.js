import {fork} from "child_process";

(async () => {
    const arr = Array.from({ length: 1500 }, (_, i) => i + 1);
    for(const id of arr) {
        console.log('Launching bot #' + id)
        await new Promise((resolve) => {
            setTimeout(() => resolve(), 2000)
        });
        fork('src/bot.js', [id]);
    }

})()
