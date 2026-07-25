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
    },
    {
      name: 'In the Name of the World',
      rarity: 5,
      recommended: false,
      note: 'Great for teams with debuffers',
    },
    {
      name: 'Good Night and Sleep Well',
      rarity: 4,
      recommended: false,
      note: 'F2P-friendly, strong DoT support',
    },
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
