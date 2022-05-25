export default {
    state: {
        choice: -1,
        choices: [
        ]
    },
    getters: {
        style(state) {
            if (state.choice > 0 && state.choices.length) {
                return state.choices.find(v => v.id === state.choice).style;
            }
            return '';
        }
    },
    mutations: {
        SET_CHOICE(state, choice) {
            state.choice = choice;
        },
        SET_CHOICES(state, choices) {
            state.choices = choices;
        }
    }
}