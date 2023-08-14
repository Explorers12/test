package com.preproject.seb_pre_15.question.service;

import com.preproject.seb_pre_15.exception.BusinessLogicException;
import com.preproject.seb_pre_15.exception.ExceptionCode;
import com.preproject.seb_pre_15.member.entity.Member;
import com.preproject.seb_pre_15.question.entity.Question;
import com.preproject.seb_pre_15.question.repository.QuestionRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
  private final QuestionRepository questionRepository;
  
  public QuestionService(QuestionRepository questionRepository) {
    this.questionRepository = questionRepository;
  }
  //질문글 등록
  public Question createQuestion(Question question){
    
    return questionRepository.save(question);
  }
  //질문글 수정
  public Question updateQuestion(Question question){
    
    return questionRepository.save(question);
  }
 
  //Answer 조회용 Question 조회
  public Question findQuestion(long questionId) {
    return findVerifiedQuestionByQuery(questionId);
  }
  //질문글 조회(게시판 -> 본문), 해당 질문글 조회수 증가
  public Question findQuestion(long questionId, HttpServletRequest request, HttpServletResponse response) {
    Question findQuestion = findVerifiedQuestionByQuery(questionId);
    
    return questionRepository.save(addQuestionView(request, response, findQuestion));
  }
  //조회수 증가, 조회글 쿠키 생성 로직
  private Question addQuestionView(HttpServletRequest request, HttpServletResponse response, Question findQuestion){
    if (shouldUpdateQuestionView(request, findQuestion)) {// 쿠키 조회, 없으면 조회수 증가 + 쿠키 생성
      findQuestion.setView(findQuestion.getView() + 1);
      
      Cookie viewedCookie = new Cookie("viewed_question_" + findQuestion.getQuestionId(), "true");
      viewedCookie.setMaxAge(86400); // 쿠키 만료시간 하루로 설정
      response.addCookie(viewedCookie);
    }
    return findQuestion;
  }
  
  //쿠키 조회 로직
  private boolean shouldUpdateQuestionView(HttpServletRequest request, Question question) {
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if (cookie.getName().equals("viewed_question_" + question.getQuestionId())) {
          return false; //배열 값 중에 질문글 쿠키가 있다면 조회수 로직을 올리지 않습니다
        }
      }
    }
    return true; //배열에서 없으면 true 리턴 -> 조회수 증가
  }
  //질문글 전체조회(게시판 조회)
  public Page<Question> findQuestions(int page, int size) {
    return questionRepository.findAll(PageRequest.of(page, size,
        Sort.by("QuestionId").descending()));
  }
  
  //멤버별 질문글 전체조회
  public Page<Question> findMemberQuestions(long memberId) {
    Pageable pageable = PageRequest.of(0, 5, Sort.by("questionId").descending());
    Page<Question> findQuestions = questionRepository.findByMemberMemberId(memberId, pageable);
    
    return findQuestions;
  }
  
    //본문 조회 로직
  private Question findVerifiedQuestionByQuery(long questionId) {
    Optional<Question> optionalQuestion = questionRepository.findById(questionId);
    Question findQuestion =
        optionalQuestion.orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    //마이페이지 게시글 검색용 에러 로그 분리필요
    return findQuestion;
  }
  
  public void deleteQuestion(long questionId) {
    Question question = findVerifiedQuestionByQuery(questionId);
    questionRepository.delete(question);
  }
  //질문 글 검색 기능, 10개씩 출력됩니다
  public Page<Question> findSearchWordQuestions(String searchWord) {
    Pageable pageable = PageRequest.of(0, 10, Sort.by("questionId").descending());
    Page<Question> findQuestions = questionRepository.findBySearchWordQuestion(searchWord, pageable);
    
    return findQuestions;
  }
  
  
  public Question updateQuestionVote(HttpServletRequest request, HttpServletResponse response, Question question) {
    Question findQuestion = findVerifiedQuestionByQuery(question.getQuestionId());
    
    if (shouldUpdateQuestionVote(request, findQuestion)) {// 쿠키 조회, 없으면 조회수 증가 + 쿠키 생성
      findQuestion.setVote(question.getVote());
      
      Cookie votedCookie = new Cookie("voted_question_" + findQuestion.getQuestionId(), "true");
      votedCookie.setMaxAge(86400); // 쿠키 만료시간 하루로 설정
      response.addCookie(votedCookie);
      }
    return questionRepository.save(findQuestion);
  }

  private boolean shouldUpdateQuestionVote(HttpServletRequest request, Question question) {
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if (cookie.getName().equals("voted_question_" + question.getQuestionId())) {
          return false; //배열 값 중에 질문글 쿠키가 있다면 추천수를 증감하지 않습니다
        }
      }
    }
    return true; //배열에서 없으면 true 리턴 -> 조회수 증가
  }
}

