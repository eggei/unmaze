module.exports = {
  ability: {
    name: 'chlorophyll',
    url: 'https://pokeapi.co/api/v2/ability/34/',
  },
  forms: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon-form/1/',
    },
  ],
  move: {
    name: 'razor-wind',
    url: 'https://pokeapi.co/api/v2/move/13/',
  },
  version_group_details: {
    slot: 3,
    level_learned_at: 0,
    move_learn_method: {
      name: 'egg',
      url: 'https://pokeapi.co/api/v2/move-learn-method/2/',
      version_group: {
        name: 'crystal',
        url: 'https://pokeapi.co/api/v2/version-group/4/',
        details: {
          is_hidden: true,
          slot: 3,
          base_experience: {
            name: 'exp',
            level: 64,
          },
        },
      },
    },
  },
}
