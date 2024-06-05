import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program.requiredOption ('--mode <mode>', 'mode app', 'production')
//.requiredOption('-u <user>', 'Usuario habilitado', 'Usuario no habilitado');
program.parse();

const options = program.opts();

const env = options.mode;

dotenv.config({
    path: env === 'production' ? './.env.prod' : './.env.dev'
});

export default {
    port: process.env.PORT,
    mong_url: process.env.MONGO_URL,
    admin_name: process.env.ADMIN_NAME,
    admin_pass: process.env.ADMIN_PASS
}
console.log('Options: ', program.opts());
console.log('Remainig Arguments: ', program.args);
console.log('Arguments from Process: ', process.argv);
