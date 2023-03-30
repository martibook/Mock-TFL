import { reactive } from "vue";

export const initConversations = [
    {
        id: '1',
        name: 'Moley',
        recipients: [
            {
                phoneNumber: '25639854'
            }
        ]
    },
    {
        id: '2',
        name: 'Bear',
        recipients: [
            {
                phoneNumber: '3336669'
            }
        ]
    }
];

export const initMessages = [
    {
        conversationId: '1',
        body: 'Hello',
        direction: 'in'
    },
    {
        conversationId: '1',
        body: 'Happy New Year!',
        direction: 'in'
    },
    {
        conversationId: '2',
        body: 'Cream together butter-sugar and then blend with beaten eggs',
        direction: 'in'
    },
    {
        conversationId: '2',
        body: 'Combine flour mix and beaten eggs',
        direction: 'in'
    },
    {
        conversationId: '2',
        body: 'Bake the cake as per your convenience',
        direction: 'in'
    },
    {
        conversationId: '2',
        body: 'Check with a knife or skewer if it is cooked and serve',
        direction: 'in'
    },
    {
        conversationId: '2',
        body: 'Make whipping cream',
        direction: 'in'
    }
];

export const initCurrentConversationId = "2";
export const initLTWCurrentConversationId = "1";

export const store = reactive({
    conversations: initConversations,
    messages: initMessages,
    currentConversationId: initCurrentConversationId,
    ltwConversations: initConversations,
    ltwMessages: initMessages,
    ltwCurrentConversationId: initLTWCurrentConversationId
})