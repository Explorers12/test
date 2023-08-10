package com.preproject.seb_pre_15.member.service;

import com.preproject.seb_pre_15.member.repository.MemberRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public class MemberService {
  private final MemberRepository memberRepository;
  
  public MemberService(MemberRepository memberRepository) {
    this.memberRepository = memberRepository;
  }
  //회원 등록, 최초 인증 성공시 성공 핸들러에서 실행됩니다
  public Member createMember(Member member) {
    if (!existsEmail(member.getEmail())) {
      Member savedMember = memberRepository.save(member);
      return savedMember;
    }
    return null;
  }
  
  //마이페이지 회원정보 조회
  @Transactional(readOnly = true)
  public Member findMember(long memberId) {
    return findVerifiedMember(memberId);
  }
  
  //마이페이지 회원 닉네임 수정
  public Member updateMember(Member member) {
    Member findMember = findVerifiedMember(member.getMemberId());
    findMember.getname = member.getname;
    
    return memberRepository.save(findMember);
  }
  
  //회원정보 조회 실패시 예외 발생
  @Transactional(readOnly = true)
  public Member findVerifiedMember(long memberId) {
    Optional<Member> optionalMember =
        memberRepository.findById(memberId);
    Member findMember =
        optionalMember.orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    return findMember;
  }
  
  //회원정보 삭제
  public void deleteMember(long memberId) {
    Member findMember = findVerifiedMember(memberId);
    
    memberRepository.delete(findMember);
  }
  
}


