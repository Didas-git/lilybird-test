import {
    EmbedFooter,
    ButtonStyle,
    EmbedField,
    ActionRow,
    Embed,
    Button,
    Event
} from "lilybird"

export default {
    event: "interactionCreate",
    async run(interaction) {
        if (interaction.inGuild()) {
            if (interaction.isApplicationCommandInteraction()) {
                await interaction.deferReply();

                console.log("Inside Slash:", process.memoryUsage().heapUsed / 1024 / 1024)

                const embed = (
                    <Embed title="Hello from TSX" color={0xff00ef} timestamp>
                        {Array.from({ length: 4 }, (_, i) => (
                            <EmbedField name={`Field ${i}`} value={i.toString()} inline />
                        ))}
                        <EmbedFooter text={`Hii ${interaction.member.user.username}`} />
                    </Embed>
                );

                setTimeout(async () => {
                    await interaction.editReply(`<@${interaction.data.options.getNumber("num", true)}>`);
                    await interaction.followUp(`*hiii~*`, { embeds: [embed] });

                    const simpleButtonRow = (
                        <ActionRow>
                            <Button id="test-p-button" label="Click Me" style={ButtonStyle.Primary} disabled />
                            <Button id="test-s-button" label="Graayy" style={ButtonStyle.Secondary} disabled />
                            <Button id="test-sc-button" label="Okay" style={ButtonStyle.Success} disabled />
                            <Button id="test-d-button" label="No" style={ButtonStyle.Danger} disabled />
                        </ActionRow>
                    )

                    await interaction.followUp("Here, some buttons", { components: [simpleButtonRow] })

                    console.log(`Finished answering ${interaction.member.user.username}'s request`)
                }, 1000);
            }
        }
    }
} as Event<"interactionCreate">