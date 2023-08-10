package com.preproject.seb_pre_15.member.mapper;

import com.preproject.seb_pre_15.member.dto.MemberPatchDto;
import com.preproject.seb_pre_15.member.dto.MemberResponseDto;
import com.preproject.seb_pre_15.member.entity.MemberEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    MemberResponseDto memberEntityToMemberResponseDto(Member member);
    Member memberPatchDtoToMemberEntity(MemberPatchDto memberPatchDto);
}