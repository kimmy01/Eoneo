package com.kyp.eoneo.repository;

import com.kyp.eoneo.dto.UserDetailDto;
import com.kyp.eoneo.entity.Country;
import com.kyp.eoneo.entity.User;
import com.kyp.eoneo.entity.UserDetail;
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
    }

    public UserDetailDto findUserDetail(User user){
        UserDetailDto userDetailDto = em.createQuery("select new com.kyp.eoneo.dto.UserDetailDto(ud.user, ud.nationality, ud.gender, ud.nickname, ud.description, ud.profile_image) from UserDetail ud where ud.user = :user", UserDetailDto.class)
                .setParameter("user", user.getId()).getSingleResult();
        return userDetailDto;
    }

    @Modifying
    public void updateUserDetail(Long userid, String nationality, int gender, String nickname, String description, String profile_image){
        em.createQuery("update UserDetail ud set ud.nationality = :nationality, ud.gender = :gender, ud.nickname = :nickname, ud.description = :description, ud.profile_image = :profile_image where ud.user = :userid")
                .setParameter("userid", userid)
                .setParameter("nationality", nationality)
                .setParameter("gender", gender)
                .setParameter("nickname", nickname)
                .setParameter("description", description)
                .setParameter("profile_image", profile_image)
                .executeUpdate();
    }

}
