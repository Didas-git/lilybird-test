import {
    CommandSubCommandGroupOption,
    CommandSubCommandOption,
    CommandUserOption,
    CommandRoleOption,
    createClient,
    EmbedFooter,
    ButtonStyle,
    EmbedField,
    ActionRow,
    Intents,
    Command,
    Embed,
    Button,
} from "lilybird";


await createClient({
    token: process.env.TOKEN,
    intents: [Intents.GUILDS],
    attachDebugListener: true,
    listeners: {
        async ready(client) {
            console.log("Connected!\n", client);

            const command = (
                <Command name="permissions" description="Get or edit permissions for a user or a role">
                    <CommandSubCommandGroupOption name="user" description="Get or edit permissions for a user">
                        <CommandSubCommandOption name="get" description="Get permissions for a user">
                            <CommandUserOption name="user" description="The user to get" required />
                            <CommandRoleOption name="channel" description="The channel permissions to get. If omitted, the guild permissions will be returned" />
                        </CommandSubCommandOption>
                        <CommandSubCommandOption name="edit" description="Edit permissions for a user">
                            <CommandUserOption name="user" description="The user to edit" required />
                            <CommandRoleOption name="channel" description="The channel permissions to edit. If omitted, the guild permissions will be returned" />
                        </CommandSubCommandOption>
                    </CommandSubCommandGroupOption>
                    <CommandSubCommandGroupOption name="role" description="Get or edit permissions for a role">
                        <CommandSubCommandOption name="get" description="Get permissions for a role">
                            <CommandUserOption name="role" description="The role to get" required />
                            <CommandRoleOption name="channel" description="The channel permissions to get. If omitted, the guild permissions will be returned" />
                        </CommandSubCommandOption>
                        <CommandSubCommandOption name="edit" description="Edit permissions for a role">
                            <CommandUserOption name="role" description="The role to edit" required />
                            <CommandRoleOption name="channel" description="The channel permissions to edit. If omitted, the guild permissions will be returned" />
                        </CommandSubCommandOption>
                    </CommandSubCommandGroupOption>
                </Command>
            );

            await client.rest.createGuildApplicationCommand(client.id, process.env.TEST_GUILD_ID, command);
        },
        async interactionCreate(interaction) {
            if (interaction.inGuild()) {
                if (interaction.isApplicationCommandInteraction()) {
                    await interaction.deferReply();

                    const embed = (
                        <Embed title="Hello from TSX" color={0xff00ef} timestamp>
                            {Array.from({ length: 4 }, (_, i) => (
                                <EmbedField name={`Field ${i}`} value={i.toString()} inline />
                            ))}
                            <EmbedFooter text={`Hii ${interaction.member.user.username}`} />
                        </Embed>
                    );

                    setTimeout(async () => {
                        await interaction.editReply(`<@${interaction.data.options.getUser("user", true)}>`);
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
                    }, 1000);
                }
            }
        }
    }
});