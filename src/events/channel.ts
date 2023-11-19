import { Event } from "lilybird"

export default {
    event: "channelCreate",
    run(channel) {
        console.log(channel)
    },
} as Event<"channelCreate">