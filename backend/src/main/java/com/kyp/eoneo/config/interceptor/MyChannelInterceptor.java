package com.kyp.eoneo.config.interceptor;

import com.kyp.eoneo.util.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class MyChannelInterceptor implements ChannelInterceptor {
    private final TokenProvider tokenProvider;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();
        if(command.compareTo(StompCommand.SUBSCRIBE) == 0){
            String destination = accessor.getDestination();
            log.info("구독 주소" + destination);
            log.info("interceptor mesage : " + message);
        }else if (command.compareTo(StompCommand.CONNECT) == 0){
            log.info(accessor.getFirstNativeHeader("token"));
            tokenProvider.validateToken(accessor.getFirstNativeHeader("token"));
            System.out.println("사용자 연결");
        }else if(command.compareTo(StompCommand.DISCONNECT) == 0){
            System.out.println("사용자 연결 해제 ");
        }

        return message;
    }
}
