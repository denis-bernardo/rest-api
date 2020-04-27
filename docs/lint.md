# Configuração Linter VScode

Nesse projeto utiliza-se o eslint ao invés do tslint.

Acesse as configurações do projeto (cmd + shift + p e digite settings), e adicione as seguintes linhas:

```json
  "[typescript]": {
    "editor.formatOnSave": false
  },
  "[typescriptreact]": {
    "editor.formatOnSave": false
  },
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    { "language": "typescript", "autoFix": true },
    { "language": "typescriptreact", "autoFix": true }
  ]
```

Após isso, o VScode está configurado com sucesso, se caso não ocorrer automaticamente, reinicie o VScode.
