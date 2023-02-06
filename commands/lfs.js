const { SlashCommandBuilder } = require('discord.js');
const { codeBlock } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('lfs')
		.setDescription('Posts a LFS message')
        .addIntegerOption(option =>
            option
                .setName('adr')
                .setDescription("Minimum ADR")
        ),
    async execute(interaction) {
        const channel = interaction.member.voice.channel;

        if(!channel){
            await interaction.reply(`This bot can only be used if you're already in a voice channel`);
            return;
        }
        const maxUsers = channel.userLimit || 4;
        const members = Array.from(channel.members.values()).length;
        const lookingFor = maxUsers - members;
        const channelName = channel.name;
        const minADR = `${interaction.options.getInteger('adr')}+` || 'any';

        const invite = await channel.createInvite();
        const link = `https://discord.gg/${invite.code}`;

        await interaction.reply(
            codeBlock("arm", `LF${lookingFor}M | ${channelName} | ${minADR} | ${link}`)
        );
    },
};