// to better understand the structure of the language: https://github.com/hapijs/joi/blob/master/lib/language.js
const language = {
  'pt-BR': {
    root: '',
    key: '',
    any: {
      required: 'é obrigatório',
      empty: 'não pode ser vazio'
    },
    boolean: {
      base: 'deve ser um booleano (true/false)'
    },
    number: {
      base: 'deve ser um número',
      max: 'deve ser menor ou igual a {{limit}}'
    },
    string: {
      base: 'deve ser um texto',
      max: 'o tamanho deve ser menor ou igual a {{limit}} caracteres',
      length: 'o tamanho deve ser igual {{limit}} caracteres',
      email: 'deve ser um email válido',
      uri: 'deve ser uma URL válida',
      regex: {
        base: 'o valor "{{!value}}" deve seguir o seguinte formato obrigatório: {{pattern}}'
      }
    }
  }
}

export default language
