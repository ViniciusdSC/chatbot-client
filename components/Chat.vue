<template>
  <div class="chat">
    <div class="chat-header">
      <v-app-bar
        color="deep-purple"
        dark
        flat
      >
        <v-toolbar-title>Marketing Services Center</v-toolbar-title>
        <v-spacer />
      </v-app-bar>
    </div>
    <div class="chat-messages">
      <div v-for="(message, index) in messages" :key="index" :class="[message.target, 'chat-messages-message']">
        <span>{{ message.text }}</span>
      </div>
    </div>
    <div class="chat-input">
      <v-row>
        <v-col :cols="11">
          <v-text-field
            placeholder="Type something"
            @keydown="({ keyCode }) => {
              if (keyCode === 13) sendMessage()
            }"
          />
        </v-col>
        <v-col class="d-flex justify-center" :cols="1">
          <v-btn @click="sendMessage" fab dark small color="primary">
            <v-icon dark>
              mdi-minus
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  data: () => ({
    chat: null,
    messages: [
      {
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        target: 'user'
      },
      {
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        target: 'bot'
      },
      {
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        target: 'bot'
      }
    ]
  }),
  mounted () {
    this.chat = io(process.env.SOCKET_URL, {
      query: { token: 'OlaMundo' }
    })
    this.chat.on('message', (message) => {
      console.log('message', message)
    })
  },
  methods: {
    sendMessage () {
      console.log('sendMessage')
      this.chat.emit('message', 'I want to create a ticket')
    }
  }
}
</script>

<style lang="scss" scoped>
  .row {
    margin-right: 0px;
    margin-left: 0px;
    padding-right: 10px;
    padding-left: 10px;
  }
  .user {
    display: flex;
    justify-content: right;
    span {
      background: blue;
    }
  }
  .bot {
    display: flex;
    justify-content: left;
    span {
      background: red;
    }
  }
  .chat {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-rows: 64px auto 48px;
    &-header {

    }
    &-messages {
      overflow-y: scroll;
      margin-top: 10px;
      &-message {
        overflow: hidden;
        span {
          padding: 5px 15px;
          max-width: 40%;
        }
        margin: 15px;
        // padding: 10px;
      }
    }
    &-input {

    }
  }
  .col-11 {
    padding: 0px;
  }
  .col-1 {
    padding: 0px;
  }
  .v-input__slot {
    margin: 0px;
  }
  .v-text-field {
    padding: 0px;
    margin: 0px;
  }
</style>
