# Google Apps Script - Telegram Group Management / Gerenciamento de Grupos no Telegram

Este script em Google Apps Script permite gerenciar grupos no Telegram, oferecendo funcionalidades como ativar/desativar permissões de mensagens, apagar mensagens antigas, ativar/desativar o modo de manutenção, e obter estatísticas do grupo.

---

This Google Apps Script allows you to manage Telegram groups, offering functionalities like enabling/disabling message permissions, deleting old messages, enabling/disabling maintenance mode, and fetching group statistics.

## Funcionalidades / Features

- **Ativar Permissões de Mensagens / Enable Message Permissions**: Permite que os membros enviem mensagens no grupo. / Allows members to send messages in the group.
- **Desativar Permissões de Mensagens / Disable Message Permissions**: Bloqueia o envio de mensagens no grupo. / Blocks sending messages in the group.
- **Excluir Últimas N Mensagens / Delete Last N Messages**: Remove as últimas mensagens enviadas no grupo. / Deletes the last messages sent in the group.
- **Ativar Modo de Manutenção / Enable Maintenance Mode**: Bloqueia mensagens no grupo e envia um aviso de manutenção. / Blocks messages in the group and sends a maintenance notice.
- **Desativar Modo de Manutenção / Disable Maintenance Mode**: Restaura as permissões e avisa os membros que a manutenção terminou. / Restores permissions and informs members that maintenance is over.
- **Obter Total de Membros / Get Total Group Members**: Recupera o número total de membros no grupo. / Retrieves the total number of members in the group.
- **Obter Total de Mensagens do Dia / Get Total Messages Today**: Conta quantas mensagens foram enviadas no dia atual. / Counts how many messages have been sent today.

## Como Usar / How to Use

### Estrutura da URL / URL Structure
As requisições devem ser feitas via URL, passando os parâmetros necessários. / Requests should be made via URL, passing the required parameters. The basic URL structure is:

https://script.google.com/macros/s/{YOUR_SCRIPT_ID}/exec?bot_token={BOT_TOKEN}&chat_id={CHAT_ID}&status={ACTION}&count={NUMBER}

### Parâmetros / Parameters
- **bot_token**: O token do bot do Telegram. / The Telegram bot token.
- **chat_id**: O ID do grupo no Telegram. / The Telegram group ID.
- **status**: A ação desejada. Pode ser / The desired action. Can be:
  - `delete_messages`: Exclui as últimas mensagens. Use `count` para definir quantas apagar (padrão é 5). / Deletes the last messages. Use `count` to set how many to delete (default is 5).
  - `on`: Ativa o envio de mensagens no grupo. / Enables sending messages in the group.
  - `off`: Desativa o envio de mensagens no grupo. / Disables sending messages in the group.
  - `manutencao_on`: Ativa o modo de manutenção. / Enables maintenance mode.
  - `manutencao_off`: Desativa o modo de manutenção. / Disables maintenance mode.
  - `total_members`: Retorna o número total de membros no grupo. / Returns the total number of members in the group.
  - `total_messages_today`: Retorna o total de mensagens enviadas no dia. / Returns the total number of messages sent today.
- **count** (opcional / optional): Número de mensagens a serem apagadas. O padrão é 5. / Number of messages to be deleted. The default is 5.

## Exemplo de Uso / Usage Example

1. **Ativar Permissões de Mensagens / Enable Message Permissions**

?bot_token=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11&chat_id=-1001234567890&status=on

2. **Desativar Permissões de Mensagens / Disable Message Permissions**

?bot_token=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11&chat_id=-1001234567890&status=off

3. **Apagar as Últimas 10 Mensagens / Delete the Last 10 Messages**

?bot_token=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11&chat_id=-1001234567890&status=delete_messages&count=10

4. **Ativar Modo de Manutenção / Enable Maintenance Mode**

?bot_token=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11&chat_id=-1001234567890&status=manutencao_on

5. **Desativar Modo de Manutenção / Disable Maintenance Mode**

?bot_token=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11&chat_id=-1001234567890&status=manutencao_off

6. **Obter Total de Membros / Get Total Group Members**

?bot_token=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11&chat_id=-1001234567890&status=total_members

7. **Obter Total de Mensagens Enviadas Hoje / Get Total Messages Sent Today**

?bot_token=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11&chat_id=-1001234567890&status=total_messages_today

## Configuração Inicial / Initial Setup

1. Crie um novo projeto no Google Apps Script. / Create a new project in Google Apps Script.
2. Cole o código fornecido no editor. / Paste the provided code into the editor.
3. Salve o projeto e implante-o como um aplicativo da web, tornando-o acessível para "Qualquer pessoa, mesmo anônima". / Save the project and deploy it as a web app, making it accessible to "Anyone, even anonymous".
4. Use a URL gerada com os parâmetros adequados para gerenciar o grupo no Telegram. / Use the generated URL with appropriate parameters to manage the Telegram group.

---

**Atenção / Attention**: Garanta que o token do bot e o ID do chat sejam mantidos em segurança para evitar acesso não autorizado. / Ensure the bot token and chat ID are kept secure to prevent unauthorized access.
