# Gerando um Pacote Local `.tgz` com NPM

Quando você está desenvolvendo um módulo em Node.js, pode querer testá-lo localmente em outros projetos antes de publicá-lo em um registro público, como o npmjs.com. Uma das maneiras de fazer isso é criar um arquivo de pacote `.tgz` localmente e depois referenciá-lo em outro projeto. Aqui está como fazer isso com o `npm`.

## Passos:

### 1. Navegue até o diretório do seu módulo

Antes de tudo, certifique-se de estar no diretório raiz do módulo que deseja empacotar.

```bash
cd path/to/your-module
```

### 2. Execute o comando `npm pack`

No diretório do seu módulo, execute o seguinte comando:

```bash
npm pack
```

Este comando cria um arquivo `.tgz` que contém tudo o que seria enviado para o registro npm se você usasse `npm publish`. Ele respeita o arquivo `.npmignore` e/ou a propriedade `"files"` no `package.json`.

### 3. Referencie o pacote local em outro projeto

Depois de ter seu arquivo `.tgz`, você pode navegar até outro projeto e instalar o pacote localmente usando `npm install`:

```bash
npm install path/to/your-module/package-name-version.tgz
```

Substitua `package-name-version.tgz` pelo nome real do arquivo gerado no passo anterior.

## Notas:

- Lembre-se de que esse método é ótimo para testes locais, mas não é uma solução de longo prazo. Para distribuição a longo prazo, considere publicar seu módulo no registro npm ou em um registro privado.
- Sempre que você fizer alterações no módulo e quiser testá-las em outro projeto, terá que repetir o processo de empacotamento e instalação.