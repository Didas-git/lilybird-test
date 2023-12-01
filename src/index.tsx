import {
    createHandler,
    createClient,
    Intents,
} from "lilybird";

const listeners = await createHandler({
    dirs: {
        listeners: `${import.meta.dir}/events`
    }
});

await createClient({
    token: process.env.TOKEN,
    intents: [Intents.GUILDS],
    attachDebugListener: true,
    ...listeners
});