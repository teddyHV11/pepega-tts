const { SlashCommandBuilder } = require('@discordjs/builders');
const ttsPlayer = require('../utils/ttsPlayer.js')
const ttsEnsure = require('../utils/ttsEnsure.js')

const characterLimit = 2000

module.exports = {
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName('cyzon')
        .setDescription('Send a Cyzon */voice* TTS message in your current voice channel')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Your TTS message')
                .setRequired(true)),
    async execute(interaction) {
        const phrase = interaction.options.getString('message');

        const err = await ttsEnsure(interaction, phrase, characterLimit)
        if (err) return interaction.reply(err)
        ttsPlayer.cyzon(interaction.guild.id, phrase)
    },
};
