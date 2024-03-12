const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function frontendStart() {
    let masterTimer = setTimeout(async () => {
        if (true) {
            console.log("//============== Frontend Has Been Started ============//")
            let timer2 = setTimeout(async () => {
                let { stdout } = exec("firefox http://localhost:3000 --kiosk")
                if (stdout) {
                    console.log("//========= fireFox has been started =========//")
                    let timer3 = setTimeout(() => {
                        let { stdout } = exec("xdotool search --sync --onlyvisible --name firefox key F11")
                        if (stdout) {
                            console.log("//========= F11 Command has been executed ====//")
                        }
                        clearTimeout(timer3)
                    }, 6000)
                }
                clearTimeout(timer2)
                clearTimeout(masterTimer)
            }, 10000)
        }
    }, 10000);
}

module.exports = frontendStart;
