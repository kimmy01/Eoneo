package com.kyp.eoneo.repository;

import com.kyp.eoneo.entity.*;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class UserDetailRepository {

    @PersistenceContext
    private EntityManager em;

    public void createUserDetail(UserDetail userDetail){
        em.persist(userDetail);
        em.flush();
    }

    public void createUserLanguage(UserLanguage userLanguage){
        em.persist(userLanguage);
        em.flush();
    }

    public void createPrefTopic(PrefTopic prefTopic){
        em.persist(prefTopic);
        em.flush();
    }


//    public UserDetailDto findUserDetail(User user){
//        UserDetailDto userDetailDto = em.createQuery("select new com.kyp.eoneo.dto.UserDetailDto(ud.user, ud.nationality, ud.gender, ud.nickname, ud.description, ud.profile_image) from UserDetail ud where ud.user = :user", UserDetailDto.class)
//                .setParameter("user", user.getId()).getSingleResult();
//        return userDetailDto;
//    }

//    @Modifying
//    public void updateUserDetail(Long userid, Country nationality, int gender, String nickname, String description, String profile_image){
//        em.createQuery("update UserDetail ud set ud.nationality = :nationality, ud.gender = :gender, ud.nickname = :nickname, ud.description = :description, ud.profile_image = :profile_image where ud.id = :userid")
//                .setParameter("userid", userid)
//                .setParameter("nationality", nationality)
//                .setParameter("gender", gender)
//                .setParameter("nickname", nickname)
//                .setParameter("description", description)
//                .setParameter("profile_image", profile_image)
//                .executeUpdate();
//    }

    @Modifying
    public void updateUserDetail(UserDetail userDetail){
        User user = userDetail.getUser();
        Country country = userDetail.getNationality();
        int gender = userDetail.getGender();
        String nickname = userDetail.getNickname();
        String description = userDetail.getDescription();

        em.createQuery("update UserDetail ud set ud.nationality = :country, ud.gender = :gender, ud.nickname = :nickname, ud.description = :description where ud.user = :user")
                .setParameter("user", user)
                .setParameter("country", country)
                .setParameter("gender", gender)
                .setParameter("nickname", nickname)
                .setParameter("description", description)
                .executeUpdate();
    }

    @Modifying
    public void updateUserLanguage(UserLanguage userLanguage){
        User user = userLanguage.getUser();
        Language fluentLanguage = userLanguage.getFluentLanguage();
        Language nativeLanguage = userLanguage.getNativeLanguage();
        Language wantLanguage = userLanguage.getWantLanguage();

        em.createQuery("update UserLanguage ul set ul.fluentLanguage = :fluentLanguage, ul.nativeLanguage = :nativeLanguage, ul.wantLanguage = :wantLanguage where ul.user = :user")
                .setParameter("fluentLanguage", fluentLanguage)
                .setParameter("nativeLanguage", nativeLanguage)
                .setParameter("wantLanguage", wantLanguage)
                .setParameter("user", user)
                .executeUpdate();
    }

    @Modifying
    public void uploadUserImage(Long id, String profileImageUrl){
        User user = em.find(User.class, id);

        em.createQuery("update UserDetail ud set ud.profile_image = :profileImageUrl where ud.user = :user")
                .setParameter("user", user)
                .setParameter("profileImageUrl", profileImageUrl)
                .executeUpdate();
    }

    public Topic getTopic(Long topicId){
        return em.find(Topic.class, topicId);
    }

    public void deleteUserPrefTopics(UserDetail userDetail){
        User user = userDetail.getUser();
        em.createQuery("delete from PrefTopic pt where pt.user = :user").setParameter("user", user).executeUpdate();
    }
}
