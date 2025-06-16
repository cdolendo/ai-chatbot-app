package com.example.aichatbot.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono; // For reactive programming
import reactor.core.scheduler.Schedulers; // Import Schedulers for offloading blocking calls

import java.util.List;

@Service
public class ChatService {

    private final ChatClient chatClient;

    /**
     * Constructor for ChatService, injecting the ChatClient.Builder.
     * The ChatClient.Builder is auto-configured by Spring AI based on your
     * `application.yml` settings (e.g., for Ollama).
     *
     * @param chatClientBuilder A builder for creating ChatClient instances.
     */
    public ChatService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    /**
     * Sends a message to the AI model and returns its response reactively.
     * IMPORTANT: The blocking call to chatClient.call() is offloaded to a
     * boundedElastic scheduler to prevent blocking the reactive event loop.
     *
     * @param message The user's input message.
     * @return A Mono emitting the AI's generated content (String).
     */
    public Mono<String> getAiResponse(String message) {
        return Mono.fromCallable(() -> {
                    // Build the prompt with the user's message
                    Prompt prompt = new Prompt(List.of(new UserMessage(message)));

                    // Call the AI model and get the chat response
                    ChatResponse response = chatClient.prompt(prompt).call().chatResponse();

                    // Extract the content from the AI's output
                    return response.getResult().getOutput().getContent();
                })
                .subscribeOn(Schedulers.boundedElastic()) // Offload the blocking call to a dedicated thread pool
                .doOnError(e -> System.err.println("Error calling AI: " + e.getMessage())); // Basic error logging
    }
}