import {
    createHandler,
    createClient,
    Intents,
} from "lilybird";

const listeners = await createHandler({
    listeners: `${import.meta.dir}/events`
});

console.log("Before Client:", process.memoryUsage().heapUsed / 1024 / 1024)

await createClient({
    token: process.env.TOKEN,
    intents: [Intents.GUILDS],
    attachDebugListener: true,
    ...listeners
});

console.log("After client:", process.memoryUsage().heapUsed / 1024 / 1024)