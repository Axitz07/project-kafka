export const kafka = {
  name: 'Kafka',
  title: 'Stellaron Hunter',
  codename: '"Kafka"',
  rarity: 5,
  path: 'The Nihility',
  element: 'Lightning',
  faction: 'Stellaron Hunters',
  rank: 'Member',

  description:
    'A member of the Stellaron Hunters known for her calm demeanor and mysterious past. ' +
    'Her very name sends shivers through the cosmos — a predator who moves in silence, ' +
    'strikes with precision, and disappears before her prey even knows she was there.',

  quote: '"The stars don\'t care about your feelings. Neither do I."',

  stats: {
    hp: 1047,
    atk: 640,
    def: 388,
    spd: 100,
  },

  skills: [
     {
      name: 'Caressing Moonlight',
      type: 'Basic ATK',
      description: 'Deals Lightning DMG equal to 50% of Kafka\'s ATK to a single enemy.',
    },
    {
      name: 'Prismatic Hair Trigger',
      type: 'Skill',
      description:
        'Immediately trigger the Shock state on all enemies. Additionally deals Lightning DMG equal to 60% of Kafka\'s ATK to target enemy.',
    },
    {
      name: 'Twilight Trill',
      type: 'Ultimate',
      description:
        'Deals Lightning DMG equal to 48% of Kafka\'s ATK to all enemies, with a high chance to inflict Shock.',
    },
    {
      name: 'Gentle but Cruel',
      type: 'Talent',
      description:
        'After an ally uses Basic ATK on a Shocked enemy, Kafka immediately launches a follow-up attack dealing Lightning DMG.',
    },
  ],

  lightCones: [
    {
      name: 'Patience Is All You Need',
      rarity: 5,
      recommended: true,
      note: 'Best in slot — massively amplifies DoT output',
      image: 'lc-patience.jpg',
    },
    {
      name: 'In the Name of the World',
      rarity: 5,
      recommended: false,
      note: 'Great for teams with debuffers',
      image: null,
    },
    {
      name: 'Good Night and Sleep Well',
      rarity: 4,
      recommended: false,
      note: 'F2P-friendly, strong DoT support',
      image: null,
    },
  ],

  eidolons: [
    { id: 1, name: 'Caressing Moonlight',   desc: 'Basic ATK deals extra Lightning DMG equal to 40% ATK when hitting Shocked enemies.' },
    { id: 2, name: 'Twilight Trill',         desc: 'Shock DoT duration +1 turn. Enemies affected by Kafka\'s Shock take 15% more DoT damage.' },
    { id: 3, name: 'Shining Bright',         desc: 'Skill Lv.+2 (max 15). Basic ATK Lv.+1 (max 10).' },
    { id: 4, name: 'Slash of the Ten',       desc: 'If enemy has 3+ DoT debuffs, follow-up attack DMG +30%.' },
    { id: 5, name: 'Inevitable Outcome',     desc: 'Ultimate Lv.+2 (max 15). Talent Lv.+2 (max 15).' },
    { id: 6, name: 'Pantheon of Desire',     desc: 'After Ultimate, Kafka\'s next Skill ignores 20% DEF of target.' },
  ],

  relics: [
    {
      set: 'Band of Sizzling Thunder',
      pieces: 4,
      reason: 'Core set — boosts Lightning DMG and ATK after skill use',
    },
    {
      set: 'Firmament Frontline: Glamoth',
      pieces: 2,
      reason: 'Planar set — ATK boost at 160+ SPD',
    },
  ],
}

export const kafkaFacts = [
  'She is voiced by the same actress as a fan-favorite anime character.',
  'Her motif is a moth, representing attraction to dangerous light.',
  'Kafka recruited Silver Wolf into the Stellaron Hunters.',
  'Her fighting style prioritizes efficiency — one strike, clean result.',
  'She appears calm in every situation, even when the universe is at stake.',
]
