import {fork} from "child_process";

(async () => {
    const arr = Array.from({ length: 500 }, (_, i) => i + 1);
    for(const id of arr) {
        console.log('Launching bot #' + id)
        fork('src/bot.js', [id]);
        await new Promise((resolve) => {
            setTimeout(() => resolve(), 500)
        });
    }

})()
