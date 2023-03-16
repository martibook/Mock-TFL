import { reactive } from "vue";

export const store = reactive({
    conversations: [
        {
            id: '1',
            name: 'Moley'
        },
        {
            id: '2',
            name: 'Bear'
        }
    ],
    messages: [
        {
            conversationId: '1',
            body: 'Hello'
        },
        {
            conversationId: '1',
            body: 'Happy New Year!'
        },
        {
            conversationId: '2',
            body: 'Cream together butter-sugar and then blend with beaten eggs'
        },
        {
            conversationId: '2',
            body: 'Combine flour mix and beaten eggs'
        },
        {
            conversationId: '2',
            body: 'Bake the cake as per your convenience'
        },
        {
            conversationId: '2',
            body: 'Check with a knife or skewer if it is cooked and serve'
        },
        {
            conversationId: '2',
            body: 'Make whipping cream'
        }
    ],
    currentConversationId: "2"
})