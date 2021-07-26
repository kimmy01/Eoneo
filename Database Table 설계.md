## ✔유저 테이블
id(pk, a)  

email  

password  

nickname  

profile image(path)  

description  

language 1, 2, 3(native, fluent,learning)  

nationality  

join date  

gender  

birthday date  

user_exp  

#### 탈퇴 유저 테이블(블랙리스트 유저 재가입 불가능!)

​		id(pk, a)  

​		email  

​		birthday date  

#### 	티어 테이블(비교용)

​		id(pk, a)  

​		name  

​		exp_standard(얘는 하한선)  

#### 	블랙리스트 유저 테이블(좀 더 찾아보기)
 
​		id(pk)  
 
​		user id(fk)  

​		reported count(누적 신고 횟수)  

​		reported date(제일 최근에 신고된 날짜)  

​		expired date(블락 해제 날짜) - update  

#### 	선호 주제(이용자 입장에서 필수는 아님)

​		id(pk, a)	 

​		user id(fk)  

​		대화주제 id(fk)  

#### 	선호 언어

​		user id(pk, fk)  

​		native(모국어)  

​		fluent(소통 가능)  

​		want(배우고 싶은)  

## ✔언어 카테고리 테이블

​	id(pk, a)  

​	language  

## ✔게시판 테이블

​	id(pk, a)  

​	title  

​	content  

​	date  

​	user id(fk)  

​	like count  

​	image / sound path  

## ✔댓글 테이블

​	id(pk, a)  

​	user id(댓글쓴, fk)  

​	board id(fk)  

​	content  

​	date  

​	like count  

## ✔대화방 테이블

​	keeeeeeeeeeep  

## ✔팔로잉-팔로워 테이블

​	id(pk, a)  

​	user id(fk)  

​	to(fk)  

## ✔대화 주제 테이블

​	id(pk, a)  

​	topic(title)  
