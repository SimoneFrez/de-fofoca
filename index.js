const { Client, GatewayIntentBits, Events, SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

const commands = [
    new SlashCommandBuilder()
        .setName('fofoca')
        .setDescription('Conte uma fofoca para o DeFofoca!')
        .addStringOption(option =>
            option.setName('conteudo')
                .setDescription('A fofoca que você quer contar')
                .setRequired(true))
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);


client.once(Events.ClientReady, async (readyClient) => {
    console.log(`✅ O robô ${readyClient.user.tag} está online!`);


    try {
        console.log('🔄 Registrando comandos de barra...');
        await rest.put(
            Routes.applicationCommands(readyClient.user.id),
            { body: commands },
        );
        console.log('🚀 Comandos registrados com sucesso!');
    } catch (error) {
        console.error(error);
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'fofoca') {
        const fofocaRecebida = interaction.options.getString('conteudo');
        
        const respostas = [
            `MDS! Você não me disse isso... 😱 Guardarei esse segredo sob sete chaves (ou até o próximo café)!`,
            `GENTE? Eu já suspeitava! O Serratec não é pra amadores mesmo... 👀`,
            `Huumm, anotei aqui no meu 'caderninho de bugs'. Essa fofoca foi potente! 🔥`,
            `Para tudo! ${interaction.user.username}, você tem certeza disso? Vou precisar de mais café pra processar... ☕`,
            `Vou até desligar meu monitor pra processar essa informação... Que babado! 🖥️❌`,
            `Se o professor descobre isso, o semestre acaba hoje! Abafa o caso... 🤫`,
            `Isso não é um bug, é uma 'feature' de fofoca! Adorei! 🐞✨`,
            `Meus circuitos estão fritando com essa fofoca! Alguém me dá um cooler! 🧊🤖`,
            `O código pode não compilar, mas a fofoca tá rodando sem erro nenhum! 🚀`,
            `Essa informação vale mais que uma vaga de Júnior na gringa! 💸🌍`
        ];

        const respostaAleatoria = respostas[Math.floor(Math.random() * respostas.length)];

        await interaction.reply({ content: respostaAleatoria });
        
 
        console.log(`[FOFOCA NOVA]: ${interaction.user.tag} disse: ${fofocaRecebida}`);
    }
});


client.on(Events.GuildMemberAdd, member => {
    const channelId = '1443594523627491381'; 
    const channel = member.guild.channels.cache.get(channelId);
    if (channel) {
        channel.send(`🎉 **Mais um fofoqueiro na área!** Bem-vindo(a), ${member}! Prepara o teclado que aqui o código é bruto e a fofoca é de qualidade! 🚀`);
    }
});

client.login(process.env.DISCORD_TOKEN);