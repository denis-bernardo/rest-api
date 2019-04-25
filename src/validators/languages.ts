// to better understand the structure of the language: https://github.com/hapijs/joi/blob/master/lib/language.js
const language = {
  'pt-BR': {
    root: '',
    key: '',
    any: {
      required: 'O campo {{key}} é obrigatório'
    },
    string: {
      base: 'deve ser um texto'
    }
  }
}

export default language
