export default {
    required: v => !!v || 'Это поле обязательное!',
    notEmptyArray: v => !!v.length || 'Это поле обязательное!',
    onlyAlphabetic: v => /^[A-Za-z\u0400-\u04FF ]*$/.test(v) || 'Только буквенные символы!'
}