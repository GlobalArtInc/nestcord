import { Injectable, UseFilters } from '@nestjs/common';
import { PermissionFlagsBits } from 'discord.js';
import {
  Context,
  Cooldown,
  Options,
  Permissions,
  SlashCommand,
  SlashCommandContext,
  TextCommand,
  TextCommandContext,
  UserCommand,
  UserCommandContext,
} from '../../../packages';
import { CooldownExceptionFilter, PermissionsExceptionFilter } from './guards.filter';
import { ClearDto, KickDto } from './guards.dtos';

@Injectable()
@UseFilters(CooldownExceptionFilter, PermissionsExceptionFilter)
export class GuardsGateway {
  /**
   * Kick command — requires KickMembers permission.
   * Demonstrates @Permissions on a slash command.
   */
  @Permissions(PermissionFlagsBits.KickMembers)
  @SlashCommand({ name: 'kick', description: 'Kick a member from the server' })
  async onKick(@Context() [interaction]: SlashCommandContext, @Options() { user }: KickDto) {
    const member = interaction.guild?.members.cache.get(user);
    if (!member) return interaction.reply({ content: 'Member not found.', ephemeral: true });

    await member.kick();
    return interaction.reply({ content: `✅ Kicked **${member.user.tag}**.`, ephemeral: true });
  }

  /**
   * Clear command — requires ManageMessages + ViewChannel (user must have ALL of them).
   * Demonstrates @Permissions with multiple flags.
   */
  @Permissions(PermissionFlagsBits.ManageMessages, PermissionFlagsBits.ViewChannel)
  @SlashCommand({ name: 'clear', description: 'Delete the last N messages in this channel' })
  async onClear(@Context() [interaction]: SlashCommandContext, @Options() { amount }: ClearDto) {
    const channel = interaction.channel;

    if (!channel?.isTextBased() || channel.isDMBased()) {
      return interaction.reply({ content: 'This command only works in guild text channels.', ephemeral: true });
    }

    await channel.bulkDelete(amount, true);
    return interaction.reply({ content: `✅ Deleted ${amount} messages.`, ephemeral: true });
  }

  /**
   * Roll command — 5-second cooldown per user.
   * Demonstrates @Cooldown without any permission restriction.
   */
  @Cooldown(5_000)
  @SlashCommand({ name: 'roll', description: 'Roll a random number between 1 and 100' })
  async onRoll(@Context() [interaction]: SlashCommandContext) {
    const result = Math.floor(Math.random() * 100) + 1;
    return interaction.reply({ content: `🎲 You rolled **${result}**!` });
  }

  /**
   * Daily command — 24-hour cooldown per user (in-memory, resets on restart).
   * Demonstrates a long cooldown use case.
   */
  @Cooldown(86_400_000)
  @SlashCommand({ name: 'daily', description: 'Claim your daily reward' })
  async onDaily(@Context() [interaction]: SlashCommandContext) {
    return interaction.reply({ content: '🎁 You claimed your daily reward! Come back tomorrow.' });
  }

  /**
   * Ban user context menu — requires BanMembers permission AND has a 10-second cooldown.
   * Demonstrates combining @Permissions + @Cooldown on the same handler.
   */
  @Permissions(PermissionFlagsBits.BanMembers)
  @Cooldown(10000)
  @UserCommand({ name: 'Ban user' })
  async onBanContextMenu(@Context() [interaction]: UserCommandContext) {
    const target = interaction.targetMember;
    if (!target || !('ban' in target)) {
      return interaction.reply({ content: 'Could not resolve member.', ephemeral: true });
    }

    await target.ban({ reason: 'Banned via context menu' });
    return interaction.reply({ content: `🔨 Banned **${interaction.targetUser.tag}**.`, ephemeral: true });
  }

  /**
   * Text command roll — also has a 5-second cooldown.
   * Demonstrates @Cooldown working with text commands (Message context).
   */
  @Cooldown(5_000)
  @TextCommand({ name: 'roll', description: 'Roll a random number' })
  async onTextRoll(@Context() [message]: TextCommandContext) {
    const result = Math.floor(Math.random() * 100) + 1;
    return message.reply(`🎲 You rolled **${result}**!`);
  }
}
