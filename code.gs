// Função para obter o token e o chat_id a partir da URL
function getTokenAndChatId(e) {
  const token = e.parameter.bot_token;
  const chatId = e.parameter.chat_id;

  if (!token || !chatId) {
    throw new Error("Parâmetros bot_token e chat_id são obrigatórios.");
  }

  return { token, chatId };
}

// Função para permitir mensagens no grupo
function openGroup(token, chatId) {
  const permissionsUrl = `https://api.telegram.org/bot${token}/setChatPermissions`;
  const permissionsOptions = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({
      "chat_id": chatId,
      "permissions": {
        "can_send_messages": true
      }
    })
  };

  try {
    UrlFetchApp.fetch(permissionsUrl, permissionsOptions);
    return ContentService.createTextOutput("Permissão de envio de texto: Permitida.");
  } catch (error) {
    return ContentService.createTextOutput(`Erro ao atualizar permissão: ${error.message}`);
  }
}

// Função para desativar mensagens no grupo
function closeGroup(token, chatId) {
  const permissionsUrl = `https://api.telegram.org/bot${token}/setChatPermissions`;
  const permissionsOptions = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({
      "chat_id": chatId,
      "permissions": {
        "can_send_messages": false
      }
    })
  };

  try {
    UrlFetchApp.fetch(permissionsUrl, permissionsOptions);
    return ContentService.createTextOutput("Permissão de envio de texto: Proibida.");
  } catch (error) {
    return ContentService.createTextOutput(`Erro ao atualizar permissão: ${error.message}`);
  }
}

// Função para apagar as últimas N mensagens do grupo
function deleteLastNMessages(token, chatId, n) {
  const updatesUrl = `https://api.telegram.org/bot${token}/getUpdates`;

  try {
    const response = UrlFetchApp.fetch(updatesUrl);
    const data = JSON.parse(response.getContentText());

    if (data.ok) {
      let count = 0;

      // Loop pelas atualizações
      for (let update of data.result) {
        if (update.message && update.message.chat.id == chatId) {
          const messageId = update.message.message_id;
          const deleteUrl = `https://api.telegram.org/bot${token}/deleteMessage?chat_id=${chatId}&message_id=${messageId}`;
          UrlFetchApp.fetch(deleteUrl);
          count++;

          if (count >= n) {
            break;
          }
        }
      }

      return ContentService.createTextOutput(`${count} mensagens apagadas.`);
    } else {
      return ContentService.createTextOutput("Erro ao obter atualizações.");
    }
  } catch (error) {
    return ContentService.createTextOutput(`Erro: ${error.message}`);
  }
}

// Função para ativar o modo de manutenção, enviando uma mensagem de manutenção e bloqueando mensagens
function enableMaintenanceMode(token, chatId) {
  closeGroup(token, chatId); // Bloqueia envio de mensagens
  sendMaintenanceMessage(token, chatId); // Envia mensagem de manutenção

  return ContentService.createTextOutput("Modo de manutenção ativado. Mensagem enviada.");
}

// Função para desativar o modo de manutenção, restaurando permissões e informando que a manutenção acabou
function disableMaintenanceMode(token, chatId) {
  openGroup(token, chatId); // Permite envio de mensagens

  const message = "🔧 **Manutenção finalizada** 🔧\n\nO grupo voltou ao funcionamento normal. Obrigado pela paciência!";
  const sendMessageUrl = `https://api.telegram.org/bot${token}/sendMessage`;
  const messageOptions = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({
      "chat_id": chatId,
      "text": message,
      "parse_mode": "Markdown"
    })
  };

  UrlFetchApp.fetch(sendMessageUrl, messageOptions);
  return ContentService.createTextOutput("Modo de manutenção desativado. Mensagem enviada.");
}

// Função para enviar uma mensagem de manutenção com uma imagem
function sendMaintenanceMessage(token, chatId) {
  const message = "🚧 **Manutenção em andamento** 🚧\n\nEstamos realizando manutenção no grupo para melhorar a experiência de todos. Por favor, aguarde.";
  const photoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNO4sRTgYwyJjoGmKPaliIPWGu1tyLlUlBkg&usqp=CAU";

  const sendMessageUrl = `https://api.telegram.org/bot${token}/sendMessage`;
  const messageOptions = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({
      "chat_id": chatId,
      "text": message,
      "parse_mode": "Markdown"
    })
  };
  UrlFetchApp.fetch(sendMessageUrl, messageOptions);

  // Enviar imagem
  const sendPhotoUrl = `https://api.telegram.org/bot${token}/sendPhoto`;
  const photoOptions = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({
      "chat_id": chatId,
      "photo": photoUrl,
      "caption": "Estamos em manutenção, por favor aguarde."
    })
  };
  UrlFetchApp.fetch(sendPhotoUrl, photoOptions);
}

// Função para obter o número total de membros no grupo
function getTotalGroupMembers(token, chatId) {
  const url = `https://api.telegram.org/bot${token}/getChatMemberCount?chat_id=${chatId}`;

  try {
    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());

    if (data.ok) {
      return ContentService.createTextOutput(`Total de membros no grupo: ${data.result}`);
    } else {
      return ContentService.createTextOutput("Erro ao obter o número de membros.");
    }
  } catch (error) {
    return ContentService.createTextOutput(`Erro: ${error.message}`);
  }
}

// Função para obter o total de mensagens enviadas no dia atual
function getTotalMessagesToday(token, chatId) {
  const today = new Date();
  const startOfDay = Math.floor(today.getTime() / 1000) - today.getHours() * 3600 - today.getMinutes() * 60 - today.getSeconds();
  const updatesUrl = `https://api.telegram.org/bot${token}/getUpdates`;

  try {
    const response = UrlFetchApp.fetch(updatesUrl);
    const data = JSON.parse(response.getContentText());

    if (data.ok) {
      let messageCount = 0;

      data.result.forEach(update => {
        if (update.message && update.message.chat.id == chatId && update.message.date >= startOfDay) {
          messageCount++;
        }
      });

      return ContentService.createTextOutput(`Total de mensagens enviadas hoje: ${messageCount}`);
    } else {
      return ContentService.createTextOutput("Erro ao obter atualizações.");
    }
  } catch (error) {
    return ContentService.createTextOutput(`Erro: ${error.message}`);
  }
}

// Função para tratar as requisições
function doGet(e) {
  const { token, chatId } = getTokenAndChatId(e);
  const action = e.parameter.status;
  const numMessages = parseInt(e.parameter.count) || 5;

  switch (action) {
    case 'delete_messages':
      return deleteLastNMessages(token, chatId, numMessages);
    case 'on':
      return openGroup(token, chatId); // Permite envio de mensagens
    case 'off':
      return closeGroup(token, chatId); // Bloqueia envio de mensagens
    case 'manutencao_on':
      return enableMaintenanceMode(token, chatId);
    case 'manutencao_off':
      return disableMaintenanceMode(token, chatId);
    case 'total_members':
      return getTotalGroupMembers(token, chatId);
    case 'total_messages_today':
      return getTotalMessagesToday(token, chatId);
    default:
      return ContentService.createTextOutput("Parâmetro inválido. Use um dos seguintes valores para 'status': delete_messages, on, off, manutencao_on, manutencao_off, total_members ou total_messages_today.");
  }
}
