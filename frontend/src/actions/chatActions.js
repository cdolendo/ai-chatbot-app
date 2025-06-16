export const sendMessage = (message) => async (dispatch) => {
    dispatch({type: 'SEND_MESSAGE_REQUEST', payload: message});
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain', // Spring Boot endpoint expects text/plain
            },
            body: message,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Since it's a streaming response (Text Event Stream), we need to read it
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let result = '';
        while (true) {
            const {done, value} = await reader.read();
            if (done) break;
            result += decoder.decode(value, {stream: true});
            dispatch({type: 'RECEIVE_MESSAGE_PROGRESS', payload: result}); // Dispatch progress for streaming
        }
        dispatch({type: 'RECEIVE_MESSAGE_SUCCESS', payload: result});

    } catch (error) {
        console.error("Error sending message:", error);
        dispatch({type: 'SEND_MESSAGE_FAILURE', payload: error.message});
    }
};