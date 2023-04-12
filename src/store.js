import { reactive } from "vue";

const deviceId = 'device1';

const selfPhoneNumber = '110';
const contact1 = '265387984';
const contact2 = '8986655652';

export const APIHost = '74.235.89.122:86';
// export const APIHost = 'localhost:86'

export const DeltaAction = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE'
}

export function extractConversations(messages) {
    const conversationToMessages = messages.reduce((conversations, message) => {
        const { conversationId } = message;
        conversations[conversationId] = conversations[conversationId] ?? [];
        conversations[conversationId].push(message);
        return conversations;
    }, {});

    // console.log(conversationToMessages);

    const conversations = Object.keys(conversationToMessages).map((key) => {
        const messagesOfConversation = conversationToMessages[key];
        const firstMessage = messagesOfConversation[0];
        const messageRecipients = firstMessage.recipients ?? [];
        const recipients = [...messageRecipients, firstMessage.sender].filter(person => person.phoneNumber != selfPhoneNumber);
        return {
            id: key,
            recipients: recipients
        }
    });

    // console.log(conversations)

    return conversations;
}

export function extractConversationsWithReceivers(messages) {
    const conversationToMessages = messages.reduce((conversations, message) => {
        const { conversationId } = message;
        conversations[conversationId] = conversations[conversationId] ?? [];
        conversations[conversationId].push(message);
        return conversations;
    }, {});

    // console.log(conversationToMessages);

    const conversations = Object.keys(conversationToMessages).map((key) => {
        const messagesOfConversation = conversationToMessages[key];
        const firstMessage = messagesOfConversation[0];
        const messageRecipients = firstMessage.receivers ?? [];
        const recipients = [...messageRecipients, firstMessage.sender].filter(person => person.phoneNumber != selfPhoneNumber);
        return {
            id: key,
            recipients: recipients
        }
    });

    // console.log(conversations)

    return conversations;
}

function extractMessageIDNumber(convMessageIDString) {
    const matches = convMessageIDString.match(/\d+-(\d+)/);
        const msgIDString = matches[1];
        const msgID = Number(msgIDString);
        // console.log('extracted msg id', msgID, typeof(msgID));
        return msgID;
}

export function getMessagesAndSortByID(allMessages, currentConversationID) {

    const messagesOfTheConv = allMessages.filter( item => item.conversationId == currentConversationID);
    const sortedMessages = messagesOfTheConv.sort(function(a, b) {
        return extractMessageIDNumber(a.id) - extractMessageIDNumber(b.id);
    });

    console.log('sorted messages', sortedMessages);

    return sortedMessages;
}

export function getRecepients(conversations, id) {
    const filterResults = conversations.filter((item) => item.id == id);
    return filterResults.length == 0 ? [] : filterResults[0].recipients;
}

export function getMessageCount(messages, convID) {
    const filterResults = messages.filter((item) => item.conversationId == convID);
    console.log('message count', filterResults.length);
    return filterResults.length;
}

export function updateByID(originArray, deltaArray) {

    deltaArray.map((item) => {
        if (originArray.filter(e => e.id == item.id).length == 0) {
            originArray.push(item)
        }
    })
}

export const initMessages = [
    {
        id: '1-1',
        conversationId: '1',
        body: 'Hello',
        lastModifiedDateTime: new Date().toISOString(),
        sender: {
            phoneNumber: selfPhoneNumber
        },
        recipients: [
            {
                phoneNumber: contact1
            }
        ]
    },
    {
        id: '1-2',
        conversationId: '1',
        body: 'Happy New Year!',
        lastModifiedDateTime: new Date().toISOString(),
        sender: {
            phoneNumber: contact1
        },
        recipients: [
            {
                phoneNumber: selfPhoneNumber
            }
        ]
    },
    {
        id: '2-1',
        conversationId: '2',
        body: 'Cream together butter-sugar and then blend with beaten eggs',
        lastModifiedDateTime: new Date().toISOString(),
        sender: {
            phoneNumber: selfPhoneNumber
        },
        recipients: [
            {
                phoneNumber: contact2
            }
        ]
    },
    {
        id: '2-2',
        conversationId: '2',
        body: 'Combine flour mix and beaten eggs',
        lastModifiedDateTime: new Date().toISOString(),
        sender: {
            phoneNumber: selfPhoneNumber
        },
        recipients: [
            {
                phoneNumber: contact2
            }
        ]
    },
    {
        id: '2-3',
        conversationId: '2',
        body: 'Bake the cake as per your convenience',
        lastModifiedDateTime: new Date().toISOString(),
        sender: {
            phoneNumber: selfPhoneNumber
        },
        recipients: [
            {
                phoneNumber: contact2
            }
        ]
    },
    {
        id: '2-4',
        conversationId: '2',
        body: 'Check with a knife or skewer if it is cooked and serve',
        lastModifiedDateTime: new Date().toISOString(),
        sender: {
            phoneNumber: selfPhoneNumber
        },
        recipients: [
            {
                phoneNumber: contact2
            }
        ]
    },
    {
        id: '2-5',
        conversationId: '2',
        body: 'Make whipping cream',
        lastModifiedDateTime: new Date().toISOString(),
        sender: {
            phoneNumber: contact2
        },
        recipients: [
            {
                phoneNumber: selfPhoneNumber
            }
        ]
    }
];

export const initCurrentConversationId = '2';
export const initLTWCurrentConversationId = '1';

export const store = reactive({
    deviceId: deviceId,
    selfPhoneNumber: selfPhoneNumber,
    conversations: extractConversations(initMessages.slice()),
    messages: initMessages.slice(),
    currentConversationId: initCurrentConversationId,
    ltwConversations: extractConversations(initMessages.slice()),
    ltwMessages: initMessages.slice(),
    ltwCurrentConversationId: initLTWCurrentConversationId,
    ltwDeltaMessages: [],
    syncToken: null,
    updateToken: null
})