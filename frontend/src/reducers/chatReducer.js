const initialState = {
    messages: [],
    loading: false,
    error: null,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEND_MESSAGE_REQUEST':
            return {
                ...state,
                loading: true,
                messages: [...state.messages, {type: 'user', text: action.payload}],
                error: null,
            };
        case 'RECEIVE_MESSAGE_PROGRESS':
// Update the last message (AI's response) as it streams in
            const newMessagesProgress = [...state.messages];
            const lastAIMessageIndex = newMessagesProgress.findIndex(msg => msg.type === 'ai' && msg.streaming);
            if (lastAIMessageIndex !== -1) {
                newMessagesProgress[lastAIMessageIndex] = {
                    ...newMessagesProgress[lastAIMessageIndex],
                    text: action.payload
                };
            } else {
                newMessagesProgress.push({type: 'ai', text: action.payload, streaming: true});
            }
            return {
                ...state,
                messages: newMessagesProgress,
            };
        case 'RECEIVE_MESSAGE_SUCCESS':
            const finalMessages = state.messages.map(msg =>
                msg.streaming ? {...msg, text: action.payload, streaming: false} : msg
            );
            return {
                ...state,
                loading: false,
                messages: finalMessages,
            };
        case 'SEND_MESSAGE_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default chatReducer;