import {
    CommandNumberOption,
    Command,
    Event
} from "lilybird"

export default {
    event: "ready",
    async run(client) {
        // console.log("Connected!\n", client);

        const command = (
            <Command name="test" description="its just a test">
                <CommandNumberOption name="num" description="a num" required />
            </Command>
        );

        await client.rest.createGuildApplicationCommand(client.id, process.env.TEST_GUILD_ID, command);
    },
} as Event<"ready">