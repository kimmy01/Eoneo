package com.kyp.eoneo.config.interceptor;

import com.kyp.eoneo.config.advice.exception.CustomException;
import com.kyp.eoneo.util.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import static com.kyp.eoneo.config.advice.ErrorCode.INVALID_AUTH_TOKEN;

@Slf4j
@Component
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class MyChannelInterceptor implements ChannelInterceptor {
    private final TokenProvider tokenProvider;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();
        if(command.compareTo(StompCommand.SUBSCRIBE) == 0){
            String destination = accessor.getDestination();
        }else if (command.compareTo(StompCommand.CONNECT) == 0){
            log.info(accessor.getFirstNativeHeader("Authorization"));
            String jwt =  accessor.getFirstNativeHeader("Authorization");
            log.info(jwt);
            if(jwt.startsWith("Bearer")){
                jwt = jwt.substring(6, jwt.length());
            }
            if(tokenProvider.validateToken(jwt)){
                Authentication authentication = tokenProvider.getAuthentication((jwt));
                accessor.setUser(authentication);
                System.out.println("사용자 연결");
            }else{
                log.info("not valid token");
                throw new CustomException(INVALID_AUTH_TOKEN);
            }
            System.out.println("사용자 연결");
        }else if(command.compareTo(StompCommand.DISCONNECT) == 0){
            System.out.println("사용자 연결 해제 ");
        }

        return message;
    }
}
