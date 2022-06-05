export default {
    required: v => !!v || 'Это поле обязательное!',
    notEmptyArray: v => !!v.length || 'Это поле обязательное!',
}