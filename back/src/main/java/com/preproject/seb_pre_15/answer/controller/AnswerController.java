package com.preproject.seb_pre_15.answer.controller;

import com.preproject.seb_pre_15.answer.dto.AnswerPatchDto;
import com.preproject.seb_pre_15.answer.dto.AnswerPostDto;
import com.preproject.seb_pre_15.answer.dto.AnswerResponseDto;
import com.preproject.seb_pre_15.answer.entity.Answer;
import com.preproject.seb_pre_15.answer.mapper.AnswerMapper;
import com.preproject.seb_pre_15.answer.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping
@Validated
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper mapper;


    @PostMapping("/{memberId}/{questionId}/answers")
    public ResponseEntity createAnswer(@RequestBody AnswerPostDto answerPostDto,
                                       @PathVariable("memberId") @Positive Long memberId,
                                       @PathVariable("questionId") @Positive Long questionId){
        Answer answer = answerService.createAnswer(mapper.answerPostDtoToAnswer(answerPostDto), questionId, memberId);
        AnswerResponseDto response = mapper.answerToAnswerResponseDto(answer);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PatchMapping("/{memberId}/{questionId}/answers/{answerId}")
    public ResponseEntity updateAnswer(@RequestBody AnswerPatchDto answerPatchDto,
                                       @PathVariable("answerId") @Positive Long answerId){
        Answer answer = answerService.updateAnswer(mapper.answerPatchDtoToAnswer(answerPatchDto), answerId);
        AnswerResponseDto response = mapper.answerToAnswerResponseDto(answer);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("answers/{answerId}")
    public ResponseEntity getAnswer(@PathVariable("answerId") @Positive Long answerId){
        Answer answer = answerService.findAnswer(answerId);
        AnswerResponseDto response = mapper.answerToAnswerResponseDto(answer);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("answers")
    public ResponseEntity getAnswers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size){
        Page<Answer> pageAnswers = answerService.findAnswers(page-1, size);
        List<Answer> answers = pageAnswers.getContent();
        List<AnswerResponseDto> response = mapper.answersToAnswerResponseDtos(answers);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/{memberId}/answers")
    public ResponseEntity getMemberAnswers(@PathVariable("memberId") @Positive Long memberId){
        Page<Answer> pageAnswers = answerService.findMemberAnswers(memberId);
        List<Answer> answers = pageAnswers.getContent();
        List<AnswerResponseDto> response = mapper.answersToAnswerResponseDtos(answers);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{memberId}/{answerId}")
    public ResponseEntity deleteAnswer(@PathVariable("answerId") @Positive Long answerId){
        answerService.deleteAnswer(answerId);
        return new ResponseEntity<>("success delete answer",HttpStatus.NO_CONTENT);
    }


}
