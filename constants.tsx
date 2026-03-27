
import React from 'react';
import { Users, Shield, Heart, Calendar, Gamepad2, Lock } from 'lucide-react';

export const FEATURES = [
  {
    title: 'Friendly Community',
    description: 'Join a group of mature players where everyone is welcome and toxicity is strictly not tolerated.',
    icon: <Users className="w-8 h-8" />,
  },
  {
    title: 'Active Admins',
    description: 'Our staff team is always available to help and ensures a smooth, grief-free gaming experience.',
    icon: <Shield className="w-8 h-8" />,
  },
  {
    title: 'Create Mod Server',
    description: 'Our server is fully powered by the Create mod. Build complex machines, automate processes, and engineer your wildest dreams.',
    icon: <Gamepad2 className="w-8 h-8" />,
  },
  {
    title: 'Events & Projects',
    description: 'Participate in server-wide building competitions, seasonal events, and massive community projects.',
    icon: <Calendar className="w-8 h-8" />,
  },
  {
    title: 'Safe Haven',
    description: 'A 100% Peaceful environment. No stealing, no griefing, and no PvP. Your builds are always safe.',
    icon: <Heart className="w-8 h-8" />,
  },
  {
    title: 'Whitelisted Only',
    description: 'We manually review every application to maintain the highest quality and safety for our players.',
    icon: <Lock className="w-8 h-8" />,
  },
];
